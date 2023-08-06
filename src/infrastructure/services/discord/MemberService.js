const GuildService = require("./GuildService")

class MemberService {
    constructor(discordService, guildId, memberId) {
        this.discordService = discordService
        this.memberId = memberId
        this.guild = new GuildService(discordService, guildId)
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

    isBot(member) {
        return member.user.bot
    }

    isMember(member) {
        return !member.user.bot
    }

    isMemberManageable(member) {
        return member.manageable
    }

    async getMemberDisplayAvatarURL(member, options = { dynamic: true, format: "png", size: 1024 }) {
        const avatarUrl = member?.user?.displayAvatarURL(options) || member?.user?.defaultAvatarURL ||
            "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png"
        return avatarUrl
    }
}

module.exports = MemberService
