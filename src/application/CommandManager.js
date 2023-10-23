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

    getCommand(commandName) {
        return this.commands.find(
            (cmd) => cmd.name === commandName || (cmd.aliases?.includes(commandName)),
        )
    }

    getListener(listenerName) {
        return this.listeners.get(listenerName)
    }

    registerCommand(name, commandClass) {
        this.commands.set(name, commandClass)
    }

    registerListener(name, listenerClass) {
        this.listeners.set(name, listenerClass)
    }

    async populateSlashCommands(commandsPath, clientInstance) {
        const commandFiles = this.fileReader.readDirectoryFiles(commandsPath)

        for (const File of commandFiles) {
            try {
                const slashCommand = new (File)(clientInstance)
                const commandName = slashCommand.data.name.toLowerCase()

                this.registerCommand(commandName, slashCommand)
            } catch (error) {
                clientInstance.logger.error("[FAIL] ::", `Error registering slash command ${File.name}: \n` + error)
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

                this.registerListener(listenerName, Listener)
                this.eventManager.registerEvent(clientInstance, eventDiscord)
                this.eventManager.registerObserver(eventDiscord, Listener, Listener.performOneTime)
            } catch (error) {
                clientInstance.logger.error("[FAIL] ::", `Error registering listener ${File.name}: \n` + error)
            }
        }

        clientInstance.logger.warn("[DEBUG] ::", "Listeners registrados!", true)
    }

    async registerTasks(tasksPath, clientInstance) {
        const taskFiles = this.fileReader.readDirectoryFiles(tasksPath)

        for (const File of taskFiles) {
            try {
                const task = new (File)(clientInstance)
                await this.scheduler.registerTask(task)
            } catch (error) {
                clientInstance.logger.error("[FAIL] ::", `Error registering task ${File.name}: \n` + error)
            }
        }

        try {
            this.scheduler.startTasks()
            clientInstance.logger.warn("[DEBUG] ::", "Tasks registradas!", true)
        } catch (error) {
            clientInstance.logger.error("[FAIL] ::", "Error starting tasks: \n" + error)
        }
    }

    async handleInteraction(interaction, clientInstance) {
        const slashCommand = this.commands.get(interaction.commandName)
        if (!slashCommand) return

        try {
            slashCommand.execute(interaction, clientInstance)
        } catch (error) {
            clientInstance.logger.error("[FAIL] ::", "Error executing slashcommand: " + error)
        }
    }

    async handleMessageCommand(message, clientInstance) {
        const whitespaceRegex = /\s+/
        const args = message.content.slice(this.prefix.length).trim().split(whitespaceRegex)
        const commandName = args.shift().toLowerCase()

        const messageCommand = this.getCommand(commandName)
        if (!messageCommand || messageCommand.executeFromMessage === undefined) return

        try {
            messageCommand.executeFromMessage(message, args, clientInstance)
        } catch (error) {
            clientInstance.logger.error("[FAIL] ::", "Error executing command: " + error)
        }
    }
}

module.exports = CommandManager
