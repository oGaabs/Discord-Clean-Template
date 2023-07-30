const Listener = require("@domain/models/Listener")
const { EmbedBuilder } = require("discord.js")

const GuildService = require("@infrastructure/services/discord/GuildService")
const MemberService = require("@infrastructure/services/discord/MemberService")
const Events = require("@infrastructure/services/discord/DiscordEvents")

const GUILD_ID = process.env.GUILD_ID
const WELCOME_CHANNEL_ID = "926556773194801153"
const { COLORS } = require("@infra/utils/Constants")

class WelcomeMessage extends Listener {
    constructor(client) {
        super(client, {
            eventName: "WelcomeMessage",
            eventDiscord: Events.guildMemberAdd,
            performOneTime: false,
        })

        this.memberService = null
        this.guildService = null
    }

    async execute(member) {
        this.memberService = new MemberService(this.client, member.guild.id, member.id)
        this.guildService = new GuildService(this.client, member.guild.id)

        const fetchedMember = await this.memberService.getMember(member.id)
        if (!fetchedMember) {
            console.log(`Member with ID ${member.id} not found.`)
            throw new Error(`Member with ID ${member.id} not found.`)
        }

        if (!this.guildService.checkIfMemberIsFromGuild(fetchedMember, GUILD_ID))
            return

        this.sendMessageInWelcomeChannel(member, WELCOME_CHANNEL_ID)
    }

    async sendMessageInWelcomeChannel(member, channelId) {
        const welcomeChannel = await this.guildService.getChannel(channelId)
        if (!welcomeChannel) {
            console.log(`Channel with ID ${welcomeChannel.id} not found.`)
            throw new Error(`Channel with ID ${welcomeChannel.id} not found.`)
        }

        const memberImg = await this.memberService.getMemberDisplayAvatarURL(member)
        const embedBuilder = await this.buildWelcomeEmbed(member, memberImg)

        await welcomeChannel.send({ embeds: [embedBuilder]})
    }

    async buildWelcomeEmbed(member, memberImg) {
        const embedBuilder = new EmbedBuilder()
            .setTitle("🌌 | Olá *Viajante*")
            .setColor(COLORS.DEFAULT)
            .addFields([
                { name: "⁣", value: `<@!${member.id}> **Sabemos que a estrada a frente é longa e perigosa, por isso sua presença é imprescindível em nossa jornada!**`, inline: true },
            ])
            .setDescription("Curta essa noite estrelada conosco, encontre seu cantinho e aproveite a viagem!  😉")
            .setThumbnail(memberImg)
            .setFooter(await this.guildService.getFooter())
            .setTimestamp()

        return embedBuilder
    }

    async buildWelcomeSimpleEmbed(member) {
        const embedBuilder = new EmbedBuilder()
            .setTitle("Bem-vindo à Caravana do Pudim")
            .setColor(COLORS.DEFAULT)
            .addFields([
                { name: "Novo membro", value: [`<@${member.id}>`, "Sua jornada começa aqui! <:milkyway_ej:930178378579988500>"].join("\n"), inline: false },
            ])
            .setFooter(await this.guildService.getFooter())

        return embedBuilder
    }
}

module.exports = WelcomeMessage
