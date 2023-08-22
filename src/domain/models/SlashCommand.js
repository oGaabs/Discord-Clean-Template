const { z } = require("zod")
// data with unknown keys

const slashCommandSchema = z.object(
    {
        name: z.string(),
        description: z.string(),
        category: z.string(),
        aliases: z.array(z.string()).optional(),
    },
)

class SlashCommand {
    constructor(client, options) {
        let validatedOptions
        try {
            validatedOptions = slashCommandSchema.parse(options, { strict: false })
        } catch (error) {
            throw new Error(`Invalid options passed to SlashCommand: ${error}`)
        }

        this.client = client
        this.name = validatedOptions.name
        this.data = options.data
        this.description = validatedOptions.description
        this.category = validatedOptions.category
        this.aliases = validatedOptions.aliases || []
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
            aliases: this.aliases,
        }
    }
}

module.exports = SlashCommand
