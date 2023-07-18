class SlashCommand {
    constructor(client, options) {
        this.client = client

        this.name = options.name || undefined
        this.data = options.data || undefined
        this.description = options.description || undefined
        this.category = options.category || undefined
        this.args = options.args || undefined
    }

    execute(_interaction, _discordService) {
        throw new Error(`The execute method has not been implemented by ${this.name}`)
    }

    toJSON() {
        return {
            name: this.name,
            data: this.data,
            description: this.description,
            category: this.category,
            args: this.args
        }
    }
}

module.exports = SlashCommand