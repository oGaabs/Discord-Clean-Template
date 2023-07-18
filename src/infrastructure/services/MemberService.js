const Guild = require("../models/Guild")

class MemberService {
    constructor(discordService, guildId, memberId) {
        this.guild = new Guild(discordService, guildId)
        this.memberId = memberId
    }

    async getMember(memberId) {
        return await this.guild.getMember(memberId)
    }

    async getMemberByTag(memberTag) {
        return await this.guild.getMemberByTag(memberTag)
    }

    async getMemberByNickname(memberNickname) {
        return await this.guild.getMemberByNickname(memberNickname)
    }

    async isBot(member) {
        return member.user.bot
    }

    async isMember(member) {
        return !member.user.bot
    }

    async isMemberManageable(member) {
        return member.manageable
    }

    async getMemberDisplayAvatarURL(member, options = { dynamic: true, format: "png", size: 1024 }) {
        return member.user.displayAvatarURL(options) || member.user.defaultAvatarURL || "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
    }

    async addRoleToMember(member, roleId) {
        await this.guild.addRoleToMember(member, roleId)
    }

    async removeRoleFromMember(member, roleId) {
        await this.guild.removeRoleFromMember(member, roleId)
    }

    async checkIfMemberHasRoleById(member, roleId) {
        return await this.guild.checkIfMemberHasRoleById(member, roleId)
    }

    async checkIfMemberHasRoleByName(member, roleName) {
        return await this.guild.checkIfMemberHasRoleByName(member, roleName)
    }

    async checkIfMemberIsAdmin(member) {
        return await this.guild.checkIfMemberIsAdmin(member)
    }

    async checkIfMemberHasPermission(member, permission) {
        return await this.guild.checkIfMemberHasPermission(member, permission)
    }

    async checkIfMemberIsFromGuild(member) {
        return await this.guild.checkIfMemberIsFromGuild(member)
    }
}

module.exports = MemberService
