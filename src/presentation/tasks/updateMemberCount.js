const { TimeSpan } = require("../../infrastructure/utils/Constants")
const GuildService = require("../../infrastructure/services/discord/GuildService")
const Task = require("../../domain/models/Task")

const GUILD_ID = process.env.GUILD_ID
const LOCAL_CHANNEL = "927167938706931752"

class MemberCountUpdate extends Task {
    constructor(client) {
        super(client, {
            taskName: "MemberCountUpdate",
            timerInMilliseconds: TimeSpan.fromSeconds(20).totalMilliseconds,
            performOneTime: false,
        })

        this.guildService = null
    }

    async execute() {
        // console.log(`${this.taskName}: is running...`)
        try {
            if (!this.guildService)
                this.guildService = new GuildService(this.client, GUILD_ID)

            const channel = await this.guildService.getChannel(LOCAL_CHANNEL)
            const memberCount = await this.guildService.getMemberCount()

            if (!channel)
                console.log(`Channel with ID ${LOCAL_CHANNEL} not found.`)
            if (!memberCount)
                console.log("Member count not found.")

            await this.guildService.setChannelName(channel, `👥 Membros: ${memberCount}`)
        } catch (error) {
            console.error(`${this.taskName}: Error ${error}`)
        }

        // console.log(`${this.taskName}: is finished!`)
    }
}

module.exports = MemberCountUpdate
