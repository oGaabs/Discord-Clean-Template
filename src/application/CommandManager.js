const { Collection } = require("discord.js")
const EventManager = require("./EventManager")
const Scheduler = require("@infrastructure/utils/Scheduler")

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
        const files = this.fileReader.readDirectoryFiles(commandsPath)

        files.forEach((File) => {
            try {
                const slashCommand = new (File)(clientInstance)
                const commandName = slashCommand.data.name.toLowerCase()

                this.commands.set(commandName, slashCommand)
            } catch (error) {
                console.error(error)
            }
        })

        const slashCommandsToRegister = this.commands.map((slashCommand) => slashCommand.data)
        await clientInstance.registerSlashCommands(slashCommandsToRegister)
    }

    async populateListeners(listenersPath, clientInstance) {
        const files = this.fileReader.readDirectoryFiles(listenersPath)

        files.forEach((File) => {
            try {
                const Listener = new (File)(clientInstance)
                const listenerName = Listener.eventName
                const eventDiscord = Listener.eventDiscord

                this.listeners.set(listenerName, Listener)
                this.eventManager.registerEvent(clientInstance, eventDiscord)
                this.eventManager.registerObserver(eventDiscord, Listener, Listener.performOneTime)
            } catch (error) {
                console.error(error)
            }
        })
    }

    async registerTasks(tasksPath, clientInstance) {
        const files = this.fileReader.readDirectoryFiles(tasksPath)

        files.forEach((File) => {
            try {
                const task = new (File)(clientInstance)

                this.scheduler.registerTask(task)
            } catch (error) {
                console.error(error)
            }
        })

        this.scheduler.startTasks()
    }

    async handleInteraction(interaction, discordService) {
        const slashCommand = this.commands.get(interaction.commandName)
        if (!slashCommand)
            return

        slashCommand.execute(interaction, discordService)
    }

    async handleMessageCommand(message, discordService) {
        const args = message.content.slice(this.prefix.length).trim().split(/\s+/)
        const commandName = args.shift().toLowerCase()

        const messageCommand = this.commands.get(commandName)
        if (!messageCommand || messageCommand.executeFromMessage === undefined)
            return

        messageCommand.executeFromMessage(message, args, discordService)
    }
}

module.exports = CommandManager
