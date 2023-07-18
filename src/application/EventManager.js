class EventManager {
    constructor() {
        this.eventObserversMap = new Map()
    }

    registerObserver(event, observer) {
        if (!this.eventObserversMap.has(event))
            this.eventObserversMap.set(event, [])

        const observers = this.eventObserversMap.get(event)
        observers.push(observer)
    }

    handleEvent(event, ...args) {
        const eventObservers = this.observers.get(event)
        if (eventObservers)
            eventObservers.forEach((observer) => observer.execute(...args))
    }

    registerEvent(event, handler) {
        this.client.on(event, (...args) => {
            const eventObservers = this.observers.get(event)
            eventObservers.forEach((observer) => observer.execute(...args))
        })
    }
}

module.exports = EventManager
