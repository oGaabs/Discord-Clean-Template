class EventManager {
    constructor() {
        this.eventObserversMap = new Map()
    }

    registerObserver(event, observer, performOneTime = false) {
        if (!this.eventObserversMap.has(event))
            this.eventObserversMap.set(event, [])

        const observers = this.eventObserversMap.get(event)
        observers.push({
            instance: observer,
            performOneTime,
        })
    }

    handleEvent(event, ...args) {
        const eventObservers = this.eventObserversMap.get(event)
        if (eventObservers) {
            eventObservers.forEach((observer) => {
                observer.instance.execute(...args)
                if (observer.performOneTime)
                    this.eventObserversMap.delete(event)
            })
        }
    }

    registerEvent(client, event) {
        if (this.eventObserversMap.has(event))
            return

        client.on(event, (...args) => {
            this.handleEvent(event, ...args)
        })
    }

    registerEventPerformOneTime(client, event) {
        client.once(event, (...args) => {
            this.handleEvent(event, ...args)
        })
    }
}

module.exports = EventManager
