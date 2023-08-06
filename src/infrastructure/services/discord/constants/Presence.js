const { ActivityType, PresenceUpdateStatus } = require("discord.js")

const ActivityTypes = {
    /**
    * Playing {game}
    */
    Playing: ActivityType.Playing,
    /**
     * Streaming {details}
     */
    Streaming: ActivityType.Streaming,
    /**
     * Listening to {name}
     */
    Listening: ActivityType.Listening,
    /**
     * Watching {details}
     */
    Watching: ActivityType.Watching,
    /**
     * {emoji} {details}
     */
    Custom: ActivityType.Custom,
    /**
     * Competing in {name}
     */
    Competing: ActivityType.Competing,
}

const PresenceStatus = {
    Online: PresenceUpdateStatus.Online,
    DoNotDisturb: PresenceUpdateStatus.DoNotDisturb,
    Idle: PresenceUpdateStatus.Idle,
    Invisible: PresenceUpdateStatus.Invisible,
    Offline: PresenceUpdateStatus.Offline,
}

module.exports = {
    ActivityTypes,
    PresenceStatus,
}
