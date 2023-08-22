// const InteractionFactory = require("./factory/interactionFactory")

class CommandHandler {
    constructor(commandManager, prefix) {
        this.commandManager = commandManager
        this.prefix = prefix
    }

    async handleInteraction(interaction, discordService) {
        if (interaction.user.bot)
            return

        // const interaction = InteractionFactory.create_interaction(interaction)

        if (interaction.isCommand())
            return this.commandManager.handleInteraction(interaction, discordService)

        if (interaction.isButton())
            return this.commandManager.handleButton(interaction, discordService)

        if (interaction.isSelectMenu())
            return this.commandManager.handleSelectMenu(interaction, discordService)
    }

    async handleMessageInteraction(message, discordService) {
        if (message.author.bot)
            return

        const startsWithPrefix = message.content.toLowerCase().startsWith(this.prefix)
        const mentionsBot = message.mentions.has(discordService.user)

        if (startsWithPrefix || mentionsBot)
            return this.handleMessageCommandInteraction(message, discordService)
    }

    async handleContextMenuInteraction(contextMenu, discordService) {
        await this.commandManager.handleContextMenu(contextMenu, discordService)
    }

    async handleMessageCommandInteraction(message, discordService) {
        await this.commandManager.handleMessageCommand(message, discordService)
    }
}

module.exports = CommandHandler
