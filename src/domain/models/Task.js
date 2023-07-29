class Task {
    constructor(client, options) {
        this.client = client
        this.taskName = options.taskName
        this.timerInMiliseconds = options.timerInMiliseconds
        this.performOneTime = options.performOneTime
    }

    async execute() {
        throw new Error("The method execute must be implemented")
    }
}

module.exports = Task
