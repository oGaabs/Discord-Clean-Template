class EventObserver {
    execute(..._args) {
        throw new Error("execute() method must be implemented")
    }
}

module.exports = EventObserver
