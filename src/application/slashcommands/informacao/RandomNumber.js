const { SlashCommandBuilder } = require("discord.js")
const SlashCommand = require("@domain/models/SlashCommand.js")


class RandomNumber extends SlashCommand {
    constructor(client) {
        super(client, {
            name: "RandomNumber",
            data: new SlashCommandBuilder()
                .setName("random_number")
                .setDescription("Gera um número aleatório")
                .addIntegerOption((option) =>
                    option.setName("min")
                        .setDescription("Digite o número mínimo")
                        .setRequired(true),
                )
                .addIntegerOption((option) =>
                    option.setName("max")
                        .setDescription("Digite o número máximo")
                        .setRequired(true),
                ).toJSON(),
            aliases: [""],
            description: "Gera um número aleatório",
            category: "privados",
        })
    }

    async execute(interaction, client) {
        await interaction.deferReply()

        // get the args from interaction, receving channel and message to send
        const min = interaction.options.getInteger("min")
        const max = interaction.options.getInteger("max")

        // send the message
        client.messageService.sendInteractionReply(interaction, this.generateRandomNumberWith(min, max).toString())
    }

    generateRandomNumberWith(min, max) { // with min and max and negative numbers
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1
    }
}

module.exports = RandomNumber
