const { z } = require("zod")

const taskSchema = z.object({
    taskName: z.string(),
    timerInMilliseconds: z.number(),
    performOneTime: z.boolean(),
})

class Task {
    constructor(client, options) {
        let validatedOptions
        try {
            validatedOptions = taskSchema.parse(options)
        } catch (error) {
            throw new Error(`Invalid options passed to Task: ${error.message}`)
        }

        this.client = client
        this.taskName = validatedOptions.taskName
        this.timerInMilliseconds = validatedOptions.timerInMilliseconds
        this.performOneTime = validatedOptions.performOneTime || false
    }

    getCronExpression() {
        const cronExpression = this.performOneTime ?
            `*/${this.timerInMiliseconds / 1000} * * * * *` :
            `${this.timerInMiliseconds / 1000} * * * * *`

        return cronExpression
    }

    async execute() {
        throw new Error("The method execute must be implemented")
    }
}

module.exports = Task
