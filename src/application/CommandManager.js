const { Collection } = require("discord.js")
const EventManager = require("./EventManager")
const Scheduler = require("@infrastructure/utils/Scheduler")

class CommandManager {
    constructor(prefix, fileReader, eventManager) {
        this.commands = new Collection()
        this.listeners = new Collection()
        this.slashCommands = new Collection()
        this.EventObservers = new Collection()

        this.EventManager = eventManager || new EventManager()
        this.Scheduler = eventManager || new Scheduler()

        this.prefix = prefix
        this.fileReader = fileReader
    }

    async populateCommands(commandsPath, clientInstance) {
        const files = this.fileReader.readDirectoryFiles(commandsPath)

        files.forEach((File) => {
            try {
                const slashCommand = new (File)(clientInstance)
                const commandName = slashCommand.data.name.toLowerCase()

                this.slashCommands.set(commandName, slashCommand)
            } catch (error) {
                console.error(error)
            }
        })

        const slashCommandsToRegister = this.slashCommands.map((slashCommand) => slashCommand.data)
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
                this.EventManager.registerEvent(clientInstance, eventDiscord)
                this.EventManager.registerObserver(eventDiscord, Listener, Listener.performOneTime)
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

                this.Scheduler.registerTask(task)
            } catch (error) {
                console.error(error)
            }
        })

        this.Scheduler.startTasks()
    }

    async handleInteraction(interaction, discordService) {
        const slashCommand = this.slashCommands.get(interaction.commandName)
        if (!slashCommand)
            return

        slashCommand.execute(interaction, discordService)
    }

    async handleCommand(commandName, args, message, discordService) {
        const messageCommand = this.commands.get(commandName)
        if (!messageCommand)
            return

        messageCommand.execute(message, args, discordService)
    }
}

module.exports = CommandManager
