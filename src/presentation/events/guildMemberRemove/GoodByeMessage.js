const { EmbedBuilder } = require("discord.js")
const { COLORS } = require("../../../infrastructure/utils/Constants")

const Listener = require("../../../domain/models/Listener")
const GuildService = require("../../../infrastructure/services/discord/GuildService")
const MemberService = require("../../../infrastructure/services/discord/MemberService")
const Events = require("../../../infrastructure/services/discord/constants/Events")

const GUILD_ID = process.env.GUILD_ID
const GOODBYE_CHANNEL_ID = "926540915819028521"

class GoodByeMessage extends Listener {
    constructor(client) {
        super(client, {
            eventName: "GoodbyeMessage",
            eventDiscord: Events.guildMemberRemove,
            performOneTime: false,
        })

        this.memberService = null
        this.guildService = null
    }

    async execute(member) {
        this.memberService = new MemberService(this.client, member.guild.id, member.id)
        this.guildService = new GuildService(this.client, member.guild.id)

        if (!this.memberService.isBot(member))
            return

        if (member.guild.id == GUILD_ID)
            this.sendMessageInGoodByeChannel(member, GOODBYE_CHANNEL_ID)
    }

    async sendMessageInGoodByeChannel(member, channelId) {
        const welcomeChannel = await this.guildService.getChannel(channelId)
        if (!welcomeChannel) {
            console.log(`Channel with ID ${welcomeChannel.id} not found.`)
            throw new Error(`Channel with ID ${welcomeChannel.id} not found.`)
        }

        const memberName = member.displayName
        const memberImg = await this.memberService.getMemberDisplayAvatarURL(member)
        const goodbyeEmbed = await this.buildGoodbyeEmbed(memberName, memberImg)

        await welcomeChannel.send({ embeds: [goodbyeEmbed]})
    }

    async buildGoodbyeEmbed(memberName, memberImg) {
        const embedBuilder = new EmbedBuilder()
            .setTitle("🔴 | Parece o fim da viagem")
            .setColor(COLORS.DEFAULT)
            .addFields([
                { name: `Até mais @${memberName[0].toUpperCase() + memberName.substring(1)}`, value: " **Foi uma longa jornada, mas tudo tem um fim.**" },
            ])
            .setThumbnail(memberImg)
            .setDescription("Esperamos que nossos caminhos se alinhem novamente!")
            .setFooter(await this.guildService.getFooter())
            .setTimestamp()

        return embedBuilder
    }
}

module.exports = GoodByeMessage
