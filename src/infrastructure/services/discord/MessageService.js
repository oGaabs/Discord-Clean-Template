const { ChannelType } = require("discord.js")

class MessageService {
    constructor(discordService) {
        this.discordService = discordService
    }

    async sendMessageToChannel(channel, message) {
        if (channel.type === ChannelType.GuildText)
            await channel.send(message)
    }

    async sendInteractionReply(interaction, text) {
        if (interaction.replied) return
        if (interaction.deferred) {
            await interaction.editReply(text)
            return
        }

        await interaction.reply(text)
    }

    async sendDMUser(userId, message) {
        const user = await this.discordService.users.fetch(userId)
        if (user?.dmChannel)
            await user.send(message)
    }

    async sendDMUserByInteraction(interaction, message) {
        const user = await this.discordService.users.fetch(interaction.user.id)
        if (user?.dmChannel)
            await user.send(message)
    }

    async fetchMessage(messageId, channelId) {
        const channel = await this.discordService.channels.fetch(channelId)
        if (channel.type === ChannelType.GuildText)
            return await channel.messages.fetch(messageId)
    }

    async fetchInteractionMessage(interaction) {
        const channel = await this.discordService.channels.fetch(interaction.channelId)
        if (channel.type === ChannelType.GuildText)
            return await channel.messages.fetch(interaction.message.id)
    }
}

module.exports = MessageService
