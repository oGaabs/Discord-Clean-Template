const { Collection } = require("discord.js")

class CommandService {
    constructor(prefix, fileReader) {
        this.commands = new Collection()
        this.listeners = new Collection()
        this.slashCommands = new Collection()

        this.prefix = prefix
        this.fileReader = fileReader
    }

    async populateCommands(commandsPath, clientInstance) {
        const files = this.fileReader.readDirectoryFiles(commandsPath)

        files.forEach((File) => {
            const slashCommand = new (File)(clientInstance)
            const commandName = slashCommand.data.name.toLowerCase()

            this.slashCommands.set(commandName, slashCommand)
        })

        const slashCommandsToRegister = this.slashCommands.map((slashCommand) => slashCommand.data)
        await clientInstance.setupRestAPI(slashCommandsToRegister)
    }

    async populateListeners(listenersPath, clientInstance) {
        const files = this.fileReader.readDirectoryFiles(listenersPath)

        files.forEach((File) => {
            const Listener = new (File)(clientInstance)
            const listenerName = Listener.eventName.toLowerCase()

            this.slashCommands.set(listenerName, Listener)
            Listener.handleEvent(clientInstance)
        })

    }

    async handleInteraction(interaction, discordService) {
        const slashCommand = this.slashCommands.get(interaction.commandName)
        if (!slashCommand) {
            return
        }

        slashCommand.execute(interaction, discordService)
    }

    async handleCommand(commandName, args, message, discordService) {
        const messageCommand = this.commands.get(commandName)
        if (!messageCommand) {
            return
        }

        messageCommand.execute(message, args, discordService)
    }
}

module.exports = CommandService
