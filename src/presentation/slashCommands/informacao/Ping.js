const { SlashCommandBuilder } = require("discord.js")
const SlashCommand = require("../../../domain/models/SlashCommand.js")

class Ping extends SlashCommand {
    constructor(client) {
        super(client, {
            name: "ping",
            data: new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Obter ping do bot")
                .toJSON(),
            aliases: ["pong", "latencia"],
            description: "Obter ping do bot",
            category: "informacao",
        })
    }

    async execute(interaction, client) {
        await interaction.deferReply()

        const message = `🏓 Pong! ${await client.getPing()}ms`

        client.messageService.sendInteractionReply(interaction, message)
    }

    async executeFromMessage(message, _args, client) {
        const messageText = `🏓 Pong! ${await client.getPing()}ms`

        client.messageService.sendTextToChannelWithMessage(message, messageText)
    }
}

module.exports = Ping
