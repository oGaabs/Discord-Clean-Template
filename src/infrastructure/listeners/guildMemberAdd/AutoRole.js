const Listener = require("@domain/models/Listener")
const { Events } = require("discord.js")

const GuildService = require("@infrastructure/services/GuildService")
const MemberService = require("@infrastructure/services/MemberService")
const EventService = require("@infrastructure/services/EventService")

const LOCAL_GUILD_SEPARATOR_ROLES = {
    "CargosSeparator": "926709141014196265",
}
const LOCAL_GUILD_WELCOME_ROLES = {
    "MemberRole": "926709141014196265",
    "BotRole": "YourRoleID",
}

const GUILD_ID = process.env.GUILD_ID

class OnGuildAddMember extends Listener {
    constructor(client, configurations = {}) {
        super(client, {
            eventName: Events.InteractionCreate,
            eventDiscord: Events.InteractionCreate,
            performOneTime: true,
        })

        this.eventManager = configurations.eventManager || EventService
    }

    async handleEvent(client) {
        EventService.onGuildMemberAdd(client, await this.executeCallback(client), this.performOneTime)
    }

    async executeCallback(client) {
        return async (member) => {
            const fetchedMember = await MemberService.getMember(client, member.guild.id, member.id)

            if (!fetchedMember) {
                console.log(`Member with ID ${member.id} not found.`)
                throw new Error(`Member with ID ${member.id} not found.`)
            }

            if (!MemberService.isMemberManageable(fetchedMember)) {
                console.log(`Member ${member.user.username} is not manageable.`)
                return
            }

            if (!MemberService.checkIfMemberIsFromGuild(fetchedMember, GUILD_ID))
                return

            this.addRolesSeparatorsToMember(client, member)
            this.addRolesFromNewMember(client, member)
        }
    }

    async addRolesSeparatorsToMember(discordService, member) {
        const roles = Object.values(LOCAL_GUILD_SEPARATOR_ROLES)

        for (const role of roles)
            await MemberService.addRoleToMember(member, role)

        return roles
    }

    async addRolesFromNewMember(discordService, member) {
        const roles = Object.values(LOCAL_GUILD_WELCOME_ROLES)

        for (const role of roles)
            await MemberService.addRoleToMember(member, role)


        return roles
    }

    async sendMessageInWelcomeChannel(member, channelId) {
        const welcomeChannel = GuildService.getChannel(channelId)
        if (!welcomeChannel) {
            console.log(`Channel with ID ${welcomeChannel.id} not found.`)
            throw new Error(`Channel with ID ${welcomeChannel.id} not found.`)
        }

        const memberImg = MemberService.displayAvatarURL(member)
        const embedBuilder = buildWelcomeEmbed(member, memberImg)

        await welcomeChannel.send({ embeds: [embedBuilder]})
    }

    buildWelcomeEmbed(member, memberImg) {
        const embedBuilder = new EmbedBuilder()
            .setTitle("🌌 | Olá *Viajante*")
            .setColor(this.client.colors["default"])
            .addFields([
                { name: "⁣", value: `<@!${member.id}> **Sabemos que a estrada a frente é longa e perigosa, por isso sua presença é imprescindível em nossa jornada!**`, inline: true },
            ])
            .setDescription("Curta essa noite estrelada conosco, encontre seu cantinho e aproveite a viagem!  😉")
            .setThumbnail(memberImg)
            .setFooter(this.client.getFooter(member.guild))
            .setTimestamp()

        return embedBuilder
    }

    buildWelcomeSimpleEmbed(member) {
        const embedBuilder = new EmbedBuilder()
            .setTitle("Bem-vindo à Caravana do Pudim")
            .setColor(this.client.colors["default"])
            .addFields([
                { name: "Novo membro", value: [`<@${member.id}>`, "Sua jornada começa aqui! <:milkyway_ej:930178378579988500>"].join("\n"), inline: false },
            ])
            .setFooter(this.client.getFooter(member.guild))

        return embedBuilder
    }
}

module.exports = OnGuildAddMember
