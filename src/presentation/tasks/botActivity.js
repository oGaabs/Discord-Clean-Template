const { TIMES } = require("@infra/utils/Constants")
const Task = require("@domain/models/Task")
const { ActivityType, PresenceUpdateStatus } = require("discord.js")

class PresenceUpdate extends Task {
    constructor(client) {
        super(client, {
            taskName: "PresenceUpdate",
            timerInMiliseconds: TIMES.SECOND * 30,
            performOneTime: false,
        })

        this.botStatus = [PresenceUpdateStatus.Online, PresenceUpdateStatus.DoNotDisturb, PresenceUpdateStatus.Idle]
    }

    async execute() {
        // console.log(`${this.taskName}: is running...`)

        try {
            const activities = [
                { name: "listening to your commands!", type: ActivityType.Listening },
                { name: "your messages", type: ActivityType.Watching },
                { name: "with Discord.js", type: ActivityType.Playing },
            ]

            const activity = activities[Math.floor(Math.random() * activities.length)]
            const status = this.botStatus[Math.floor(Math.random() * this.botStatus.length)]

            await this.client.updatePresence({ name: activity.name, type: activity.type, status: status })
        } catch (error) {
            console.error(`${this.taskName}: Error ${error}`)
        }

        // console.log(`${this.taskName}: is finished!`)
    }
}

module.exports = PresenceUpdate
