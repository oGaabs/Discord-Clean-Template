const Listener = require("../../../domain/models/Listener")

const MemberService = require("../../../infrastructure/services/discord/MemberService")
const GuildService = require("../../../infrastructure/services/discord/GuildService")
const Events = require("../../../infrastructure/services/discord/constants/Events")

const LOCAL_GUILD_SEPARATOR_ROLES = {
    "CargosSeparator": "926709141014196265",
}
const LOCAL_GUILD_WELCOME_ROLES = {
    "MemberRole": "930038268173643808",
    "BotRole": "926567305155055717",
}

const GUILD_ID = process.env.GUILD_ID

class AutoRole extends Listener {
    constructor(client) {
        super(client, {
            eventName: "AutoRole",
            eventDiscord: Events.guildMemberAdd,
            performOneTime: false,
        })

        this.memberService = null
    }

    async execute(member) {
        this.memberService = new MemberService(this.client, member.guild.id, member.id)
        this.guildService = new GuildService(this.client, member.guild.id)
        const fetchedMember = await this.memberService.getMember(member.id)

        if (!fetchedMember) {
            console.log(`Member with ID ${member.id} not found.`)
            throw new Error(`Member with ID ${member.id} not found.`)
        }

        if (!this.memberService.isMemberManageable(fetchedMember)) {
            console.log(`Member ${member.user.tag} is not manageable.`)
            return
        }

        if (!this.guildService.checkIfMemberIsFromGuild(fetchedMember, GUILD_ID))
            return

        this.addRolesSeparatorsToMember(this.client, member)
        this.addRolesFromNewMember(this.client, member)
    }

    async addRolesSeparatorsToMember(_discordService, member) {
        const roles = Object.values(LOCAL_GUILD_SEPARATOR_ROLES)

        for (const role of roles)
            await this.guildService.addRoleToMember(member, role)

        return roles
    }

    async addRolesFromNewMember(_discordService, member) {
        const roles = Object.values(LOCAL_GUILD_WELCOME_ROLES)
        const memberIsBot = member.user.bot

        for (const role of roles) {
            if (role === LOCAL_GUILD_WELCOME_ROLES.BotRole) {
                if (!memberIsBot)
                    continue
                await this.guildService.addRoleToMember(member, role)
            }

            await this.guildService.addRoleToMember(member, role)
        }

        return roles
    }
}

module.exports = AutoRole
