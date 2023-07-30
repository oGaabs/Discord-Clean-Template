class CommandHandler {
    constructor(commandManager, prefix) {
        this.commandManager = commandManager
        this.prefix = prefix
    }

    async handleInteraction(interaction, discordService) {
        if (interaction.user.bot)
            return

        if (interaction.isCommand())
            return this.handleCommandInteraction(interaction, discordService)

        if (interaction.isButton())
            return this.handleButtonInteraction(interaction, discordService)

        if (interaction.isSelectMenu())
            return this.handleSelectMenuInteraction(interaction, discordService)
    }

    async handleMessageInteraction(message, discordService) {
        if (message.author.bot)
            return

        if (message.content.toLowerCase().startsWith(this.prefix) || message.mentions.has(discordService.user))
            return this.handleMessageCommandInteraction(message, discordService)
    }

    async handleCommandInteraction(command, discordService) {
        await this.commandManager.handleInteraction(command, discordService)
    }

    async handleButtonInteraction(button, discordService) {
        await this.commandManager.handleButton(button, discordService)
    }

    async handleSelectMenuInteraction(selectMenu, discordService) {
        await this.commandManager.handleSelectMenu(selectMenu, discordService)
    }

    async handleContextMenuInteraction(contextMenu, discordService) {
        await this.commandManager.handleContextMenu(contextMenu, discordService)
    }

    async handleMessageCommandInteraction(message, discordService) {
        await this.commandManager.handleMessageCommand(message, discordService)
    }
}

module.exports = CommandHandler
