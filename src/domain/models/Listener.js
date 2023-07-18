class Listener {
    constructor(client, options) {
        this.client = client
        this.eventName = options.eventName || undefined
        this.eventDiscord = options.eventDiscord || undefined
        this.performOneTime = options.performOneTime || false
    }

    async handleEvent(_event) {
        throw new Error("The method handleEvent must be implemented")
    }

    async executeCallback(_client) {
        throw new Error("The method executeCallback must be implemented")
    }
}

module.exports = Listener
