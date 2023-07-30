const { TIMES } = require("@infra/utils/Constants")
const GuildService = require("@infra/services/discord/GuildService")
const Task = require("@domain/models/Task")

const GUILD_ID = process.env.GUILD_ID
const LOCAL_CHANNEL = "927167938706931752"

class MemberCountUpdate extends Task {
    constructor(client) {
        super(client, {
            taskName: "MemberCountUpdate",
            timerInMiliseconds: TIMES.SECOND * 20,
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

            channel.setName(`👥 Membros: ${memberCount}`)
        } catch (error) {
            console.error(`${this.taskName}: Error ${error}`)
        }

        // console.log(`${this.taskName}: is finished!`)
    }
}

module.exports = MemberCountUpdate
