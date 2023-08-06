class Command {
    constructor(name, description) {
        this.name = name
        this.description = description
    }

    execute(_message, _args, _discordService) {
        throw new Error("Method not implemented")
    }
}

module.exports = Command
