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

    registerEvent(client, event, performOneTime = false) {
        if (this.eventObserversMap.has(event))
            return

        if (performOneTime) {
            return client.once(event, (...args) => {
                this.notifyAll(event, ...args)
            })
        }

        client.on(event, (...args) => {
            this.notifyAll(event, ...args)
        })
    }

    notifyAll(event, ...args) {
        const eventObservers = this.eventObserversMap.get(event)
        if (eventObservers) {
            eventObservers.forEach((observer) => {
                observer.instance.execute(...args)
                if (observer.performOneTime)
                    this.unregisterObserver(event, observer)
            })
        }
    }

    unregisterObserver(event, observer) {
        const eventObservers = this.eventObserversMap.get(event)
        if (eventObservers) {
            const updatedObservers = eventObservers.filter((obs) => obs.instance !== observer.instance)
            this.eventObserversMap.set(event, updatedObservers)
        }
    }

    unregisterEvent(event) {
        this.eventObserversMap.delete(event)
    }
}

module.exports = EventManager
