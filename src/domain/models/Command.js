class Command {
    constructor(name, description) {
        this.name = name
        this.description = description
    }

    execute(message, args, discordService) {
        throw new Error("Method not implemented")
    }
}

module.exports = Command
