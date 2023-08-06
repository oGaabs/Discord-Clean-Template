const { PermissionFlagsBits } = require("discord.js")

class GuildService {
    constructor(client, guildId) {
        this.client = client
        this.guildId = guildId
    }

    async getGuild(guildId = this.guildId) {
        return await this.client.guilds.fetch(guildId)
    }

    async getMember(memberId) {
        const guild = await this.getGuild()
        return guild.members.cache.get(memberId)
    }

    async getChannel(channelId) {
        const guild = await this.getGuild()
        return guild.channels.cache.get(channelId)
    }

    async getRole(roleId) {
        const guild = await this.getGuild()
        return guild.roles.cache.get(roleId)
    }

    async getRoles() {
        const guild = await this.getGuild()
        return guild.roles.cache
    }

    async setChannelName(channel, channelName) {
        if (!channel)
            throw new Error("Channel not found.")

        await channel.setName(channelName)
    }

    async getMemberByTag(memberTag) {
        const guild = await this.getGuild()
        return guild.members.cache.find((member) => member.user.tag === memberTag)
    }

    async getMemberByNickname(memberNickname) {
        const guild = await this.getGuild()
        return guild.members.cache.find((member) => member.nickname === memberNickname)
    }

    async getMemberCount() {
        const guild = await this.getGuild()
        return guild.memberCount
    }

    async addRoleToMember(member, roleId) {
        const guild = member.guild
        const role = guild.roles.cache.get(roleId)
        const botInGuild = guild.members.cache.get(this.client.user.id)

        if (!role) {
            console.log(`Role with ID ${roleId} not found.`)
            throw new Error(`Role with ID ${roleId} not found.`)
        }
        if (!role.editable) {
            console.log(`Role with ID ${roleId} is not editable.`)
            throw new Error(`Role with ID ${roleId} is not editable.`)
        }

        if (member.roles.cache.has(role.id)) {
            console.log(`Role with ID ${roleId} already added to member ${member.user.tag}.`)
            throw new Error(`Role with ID ${roleId} already added to member ${member.user.tag}.`)
        }

        // Check if bot has permissions to add role to member
        if (!botInGuild.permissions.has(PermissionFlagsBits.ManageRoles)) {
            console.log(`Bot doesn't have permissions to add ${role.name} to member.`)
            throw new Error(`Bot doesn't have permissions to add ${role.name} to member.`)
        }

        await member.roles.add(role)
        console.log(`Added role ${role.name} to member ${member.user.tag}`)
    }

    async removeRoleFromMember(member, roleId) {
        const guild = member.guild
        const role = guild.roles.cache.get(roleId)
        const botInGuild = guild.members.cache.get(this.client.user.id)

        if (!role) {
            console.log(`Role with ID ${roleId} not found.`)
            throw new Error(`Role with ID ${roleId} not found.`)
        }
        if (!role.editable) {
            console.log(`Role with ID ${roleId} is not editable.`)
            throw new Error(`Role with ID ${roleId} is not editable.`)
        }

        if (!botInGuild.permissions.has(PermissionFlagsBits.ManageRoles)) {
            console.log(`Bot doesn't have permissions to remove ${role.name} to member.`)
            throw new Error(`Bot doesn't have permissions to remove ${role.name} to member.`)
        }

        await member.roles.remove(role)
        console.log(`Removed role ${role.name} from member ${member.tag}`)
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

    async getFooter() {
        const guild = await this.getGuild()

        return guild ? { text: guild.name, iconURL: await guild.iconURL({ dynamic: true, size: 1024 }) } : null
    }

    async getGuildIcon() {
        const guild = await this.getGuild()

        return guild ? await guild.iconURL({ dynamic: true, size: 1024 }) : null
    }

    async getGuildBanner() {
        const guild = await this.getGuild()

        return guild ? await guild.bannerURL({ dynamic: true, size: 1024 }) : null
    }

    async getGuildSplash() {
        const guild = await this.getGuild()

        return guild ? await guild.splashURL({ dynamic: true, size: 1024 }) : null
    }
}

module.exports = GuildService
