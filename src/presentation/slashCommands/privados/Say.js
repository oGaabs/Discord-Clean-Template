const { SlashCommandBuilder } = require("discord.js")
const SlashCommand = require("../../../domain/models/SlashCommand.js")

/* The Say class is a JavaScript class that extends the SlashCommand class and allows the bot to
reproduce a given message. */
class Say extends SlashCommand {
    constructor(client) {
        super(client, {
            name: "say",
            data: new SlashCommandBuilder()
                .setName("say")
                .setDescription("O bot reproduz a mensagem")
                .addStringOption((option) =>
                    option.setName("message")
                        .setDescription("Digite a mensagem que falar")
                        .setRequired(true),
                ).toJSON(),
            aliases: ["falar"],
            description: "O bot reproduz a mensagem",
            category: "privados",
        })
    }

    async execute(interaction, client) {
        await interaction.deferReply()

        // get the args from interaction, receving channel and message to send
        const message = interaction.options.getString("message")

        // send the message
        client.messageService.sendInteractionReply(interaction, message)
    }

    async executeFromMessage(message, args, client) {
        // get the args from message, receving channel and message to send
        const messageText = args.join("")
        if (messageText == "")
            return client.messageService.replyMessage(message, "Você precisa digitar uma mensagem para eu falar!")

        // send the message
        client.messageService.sendTextToChannelWithMessage(message, messageText)
    }
}

module.exports = Say
