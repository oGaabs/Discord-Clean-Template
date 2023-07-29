class Listener {
    constructor(client, options) {
        this.client = client
        this.eventName = options.eventName || undefined
        this.eventDiscord = options.eventDiscord || undefined
        this.performOneTime = options.performOneTime || false
    }

    async execute(_client, ..._args) {
        throw new Error("The method executeCallback must be implemented")
    }
}

module.exports = Listener
