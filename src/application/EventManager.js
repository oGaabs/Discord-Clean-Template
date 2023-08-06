class EventManager {
    constructor() {
        this.eventObserversMap = new Map()
    }

    registerObserver(event, observer, performOneTime = false) {
        if (!this.eventObserversMap.has(event))
            this.eventObserversMap.set(event, [])

        const observers = this.eventObserversMap.get(event)
        observers.push(new EventObserver(observer, performOneTime))
    }

    registerEvent(emitter, event, performOneTime = false) {
        if (this.eventObserversMap.has(event))
            return

        const eventHandler = (...args) => this.notifyAll(event, ...args)

        if (performOneTime)
            return emitter.once(event, eventHandler)

        emitter.on(event, eventHandler)
    }

    notifyAll(event, ...args) {
        const eventObservers = this.eventObserversMap.get(event)

        if (eventObservers) {
            eventObservers.forEach((observer) => {
                observer.execute(...args)
                if (observer.performOneTime)
                    this.unregisterObserver(event, observer)
            })
        }
    }

    unregisterObserver(event, observer) {
        const eventObservers = this.eventObserversMap.get(event)

        if (eventObservers) {
            const updatedObservers = eventObservers.filter(
                (obs) => obs.instance !== observer.instance,
            )

            this.eventObserversMap.set(event, updatedObservers)
        }
    }

    unregisterEvent(event) {
        this.eventObserversMap.delete(event)
    }
}

class EventObserver {
    constructor(instance, performOneTime) {
        this.instance = instance
        this.performOneTime = performOneTime
    }

    execute(...args) {
        this.instance.execute(...args)
    }
}

module.exports = EventManager
