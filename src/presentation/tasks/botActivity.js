const { TimeSpan } = require("../../infrastructure/utils/Constants")
const { ActivityTypes, PresenceStatus } = require("../../infrastructure/services/discord/constants/Presence")

const Task = require("../../domain/models/Task")

class PresenceUpdate extends Task {
    constructor(client) {
        super(client, {
            taskName: "PresenceUpdate",
            timerInMilliseconds: TimeSpan.fromSeconds(30).totalMilliseconds,
            performOneTime: false,
        })

        this.botStatus = [PresenceStatus.Online, PresenceStatus.DoNotDisturb, PresenceStatus.Idle]
    }

    async execute() {
        // console.log(`${this.taskName}: is running...`)

        try {
            const activities = [
                { name: "listening to your commands!", type: ActivityTypes.Listening },
                { name: "your messages", type: ActivityTypes.Watching },
                { name: "with Discord.js", type: ActivityTypes.Playing },
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
