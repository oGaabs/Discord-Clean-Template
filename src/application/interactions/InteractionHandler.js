class InteractionHandler {
    constructor(commandHandler, prefix) {
        this.commandHandler = commandHandler
        this.prefix = prefix
    }

    async handleInteraction(interaction, discordService) {
        if (interaction.user.bot)
            return

        if (interaction.isCommand()) {
            return this.handleCommandInteraction(interaction, discordService)
        }

        if (interaction.isButton()) {
            return this.handleButtonInteraction(interaction, discordService)
        }

        if (interaction.isSelectMenu()) {
            return this.handleSelectMenuInteraction(interaction, discordService)
        }
    }


    async handleCommandInteraction(command, discordService) {
        await this.commandHandler.handleInteraction(command, discordService)
    }

    async handleButtonInteraction(button, discordService) {
        await this.commandHandler.handleButton(button, discordService)
    }

    async handleSelectMenuInteraction(selectMenu, discordService) {
        await this.commandHandler.handleSelectMenu(selectMenu, discordService)
    }
}

module.exports = InteractionHandler
