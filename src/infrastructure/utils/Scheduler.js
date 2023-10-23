const cron = require("node-cron")

class Scheduler {
    constructor() {
        this.tasks = []
    }

    registerTask(task) {
        this.tasks.push(task)
    }

    startTasks() {
        this.tasks.forEach((task) => {
            this.scheduleTask(task)
        })
    }

    scheduleTask(task) {
        const secondsInterval = task.timerInMilliseconds / 1000
        if (task.performOneTime) {
            cron.schedule(`${secondsInterval} * * * * *`, async () => task.execute())
            return
        }

        cron.schedule(`*/${secondsInterval} * * * * *`, async () => task.execute())
    }
}

module.exports = Scheduler
