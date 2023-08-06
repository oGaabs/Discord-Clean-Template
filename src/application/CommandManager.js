const { Collection } = require("discord.js")
const EventManager = require("./EventManager")
const Scheduler = require("../infrastructure/utils/Scheduler")

class CommandManager {
    constructor(fileReader, prefix, eventManager, scheduler) {
        this.listeners = new Collection()
        this.commands = new Collection()

        this.eventManager = eventManager || new EventManager()
        this.scheduler = scheduler || new Scheduler()

        this.prefix = prefix
        this.fileReader = fileReader
    }

    async populateSlashCommands(commandsPath, clientInstance) {
        const commandFiles = this.fileReader.readDirectoryFiles(commandsPath)

        for (const File of commandFiles) {
            try {
                const slashCommand = new (File)(clientInstance)
                const commandName = slashCommand.data.name.toLowerCase()

                this.commands.set(commandName, slashCommand)
            } catch (error) {
                clientInstance.logger.error("[FAIL] ::", "Error registering slash command: ", error)
            }
        }

        const slashCommandsToRegister = this.commands.map((slashCommand) => slashCommand.data)
        await clientInstance.registerSlashCommands(slashCommandsToRegister)
    }

    async populateListeners(listenersPath, clientInstance) {
        const listenerFiles = this.fileReader.readDirectoryFiles(listenersPath)

        for (const File of listenerFiles) {
            try {
                const Listener = new (File)(clientInstance)
                const listenerName = Listener.eventName
                const eventDiscord = Listener.eventDiscord

                this.listeners.set(listenerName, Listener)
                this.eventManager.registerEvent(clientInstance, eventDiscord)
                this.eventManager.registerObserver(eventDiscord, Listener, Listener.performOneTime)
            } catch (error) {
                clientInstance.logger.error("[FAIL] ::", "Error registering listener: ", error)
            }
        }

        clientInstance.logger.warn("[DEBUG] ::", "Listeners registrados com sucesso!", true)
    }

    async registerTasks(tasksPath, clientInstance) {
        const taskFiles = this.fileReader.readDirectoryFiles(tasksPath)

        for (const File of taskFiles) {
            try {
                const task = new (File)(clientInstance)
                await this.scheduler.registerTask(task)
            } catch (error) {
                clientInstance.logger.error("[FAIL] ::", "Error registering task:", error)
            }
        }

        try {
            this.scheduler.startTasks()
            clientInstance.logger.warn("[DEBUG] ::", "Tasks registradas com sucesso!", true)
        } catch (error) {
            clientInstance.logger.error("[FAIL] ::", "Error starting tasks:", error)
        }
    }

    async handleInteraction(interaction, clientInstance) {
        const slashCommand = this.commands.get(interaction.commandName)
        if (!slashCommand)
            return

        try {
            slashCommand.execute(interaction, clientInstance)
        } catch (error) {
            clientInstance.logger.error("[FAIL] ::", "Error executing slashcommand: ", error)
        }
    }

    async handleMessageCommand(message, clientInstance) {
        const args = message.content.slice(this.prefix.length).trim().split(/\s+/)
        const commandName = args.shift().toLowerCase()

        const messageCommand = this.commands.get(commandName)
        if (!messageCommand || messageCommand.executeFromMessage === undefined)
            return

        try {
            messageCommand.executeFromMessage(message, args, clientInstance)
        } catch (error) {
            clientInstance.logger.error("[FAIL] ::", "Error executing command: ", error)
        }
    }
}

module.exports = CommandManager
