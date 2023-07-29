const { SlashCommandBuilder } = require("discord.js")
const SlashCommand = require("@domain/models/SlashCommand.js")


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
            category: "privados",
        })
    }

    async execute(interaction, client) {
        await interaction.deferReply()

        // get the args from interaction, receving channel and message to send
        const message = `🏓 Pong! ${client.getPing()}ms`

        // send the message
        client.messageService.sendInteractionReply(interaction, message)
    }
}

module.exports = Ping
