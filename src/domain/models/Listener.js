const { z } = require("zod")

const listenerSchema = z.object({
    eventName: z.string(),
    eventDiscord: z.string(),
    performOneTime: z.boolean().optional(),
})

class Listener {
    constructor(client, options) {
        this.client = client

        let validatedOptions
        try {
            validatedOptions = listenerSchema.parse(options)
        } catch (error) {
            throw new Error(`Invalid options passed to Listener: ${error.message}`)
        }
        
        this.eventName = validatedOptions.eventName
        this.eventDiscord = validatedOptions.eventDiscord
        this.performOneTime = validatedOptions.performOneTime || false
    }

    async execute(_client, ..._args) {
        throw new Error("The method executeCallback must be implemented")
    }
}

module.exports = Listener
