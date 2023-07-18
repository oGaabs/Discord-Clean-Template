class GuildService {
    constructor(discordService, guildId) {
        this.discordService = discordService
        this.guildId = guildId
    }

    async getGuild(guildId = this.guildId) {
        return await this.discordService.guilds.fetch(guildId)
    }

    async getMember(memberId) {
        const guild = await this.getGuild()
        return guild.members.cache.get(memberId)
    }

    async getMemberByTag(memberTag) {
        const guild = await this.getGuild()
        return guild.members.cache.find((member) => member.user.tag === memberTag)
    }

    async getMemberByNickname(memberNickname) {
        const guild = await this.getGuild()
        return guild.members.cache.find((member) => member.nickname === memberNickname)
    }

    async addRoleToMember(member, roleId) {
        const guild = member.guild
        const role = guild.roles.cache.get(roleId)
        const botHighestRole = guild.members.cache.get(guild.me.id).roles.highest

        if (!role) {
            console.log(`Role with ID ${roleId} not found.`)
            throw new Error(`Role with ID ${roleId} not found.`)
        }

        if (botHighestRole.position < role.position) {
            console.log(`Role with ID ${roleId} is higher than bot's highest role.`)
            throw new Error(`Role with ID ${roleId} is higher than bot's highest role.`)
        }

        if (member.roles.cache.has(role.id)) {
            console.log(`Role with ID ${roleId} already added to member ${member.user.username}.`)
            throw new Error(`Role with ID ${roleId} already added to member ${member.user.username}.`)
        }

        // Check if bot has permissions to add role to member
        if (!guild.me.hasPermission("MANAGE_ROLES") && !guild.me.hasPermission("ADMINISTRATOR")) {
            if (role.position > guild.me.roles.highest.position) {
                console.log(`Role with ID ${roleId} is higher than bot's highest role.`)
                throw new Error(`Role with ID ${roleId} is higher than bot's highest role.`)
            }
        }

        await member.roles.add(role)
        console.log(`Added role ${role.name} to member ${member.user.username}`)
    }

    async removeRoleFromMember(member, roleId) {
        const guild = member.guild
        const role = guild.roles.cache.get(roleId)

        if (!role) {
            console.log(`Role with ID ${roleId} not found.`)
            throw new Error(`Role with ID ${roleId} not found.`)
        }

        await member.roles.remove(role)
        console.log(`Removed role ${role.name} from member ${member.user.username}`)
    }

    async checkIfMemberHasRoleById(member, roleId) {
        const guild = member.guild
        const role = guild.roles.cache.get(roleId)

        if (!role) {
            console.log(`Role with ID ${roleId} not found.`)
            throw new Error(`Role with ID ${roleId} not found.`)
        }

        return member.roles.cache.has(role.id)
    }

    async checkIfMemberHasRoleByName(member, roleName) {
        const guild = member.guild
        const role = guild.roles.cache.find((role) => role.name === roleName)

        if (!role) {
            console.log(`Role with name ${roleName} not found.`)
            throw new Error(`Role with name ${roleName} not found.`)
        }

        return member.roles.cache.has(role.id)
    }

    async checkIfMemberIsAdmin(member) {
        return member.hasPermission("ADMINISTRATOR")
    }

    async checkIfMemberHasPermission(member, permission) {
        return member.hasPermission(permission)
    }

    async checkIfMemberIsFromGuild(member) {
        const guild = await this.getGuild()
        return member.guild.id === guild.id
    }
}

module.exports = GuildService
