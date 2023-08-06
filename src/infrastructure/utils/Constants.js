const COLORS = {
    DEFAULT: "#2F3136",
    SUCCESS: "#43B581",
    ERROR: "#F04747",
    WARNING: "#FAA61A",
    INFO: "#7289DA",
}

const TIMES = {
    SECOND: 1 * 1000,
    MINUTE: 1 * 60 * 1000,
    HOUR: 1 * 60 * 60 * 1000,
}

class TimeSpan {
    constructor(milliseconds) {
        this.totalMilliseconds = milliseconds
    }

    static fromMilliseconds(milliseconds) {
        return new TimeSpan(milliseconds)
    }

    static fromSeconds(seconds) {
        return new TimeSpan(seconds * 1000)
    }

    static fromMinutes(minutes) {
        return new TimeSpan(minutes * 60 * 1000)
    }

    static fromHours(hours) {
        return new TimeSpan(hours * 60 * 60 * 1000)
    }

    static fromDays(days) {
        return new TimeSpan(days * 24 * 60 * 60 * 1000)
    }

    getMilliseconds() {
        return this.totalMilliseconds % 1000
    }

    getSeconds() {
        return Math.floor((this.totalMilliseconds / 1000) % 60)
    }

    getMinutes() {
        return Math.floor((this.totalMilliseconds / (60 * 1000)) % 60)
    }

    getHours() {
        return Math.floor((this.totalMilliseconds / (60 * 60 * 1000)) % 24)
    }

    get TotalMilliseconds() {
        return this.totalMilliseconds
    }

    get TotalSeconds() {
        return this.totalMilliseconds / 1000
    }

    get TotalMinutes() {
        return this.totalMilliseconds / (60 * 1000)
    }

    get TotalHours() {
        return this.totalMilliseconds / (60 * 60 * 1000)
    }

    get TotalDays() {
        return this.totalMilliseconds / (24 * 60 * 60 * 1000)
    }

    toString() {
        const hours = this.getHours().toString().padStart(2, "0")
        const minutes = this.getMinutes().toString().padStart(2, "0")
        const seconds = this.getSeconds().toString().padStart(2, "0")
        const milliseconds = this.getMilliseconds().toString().padStart(3, "0")

        return `${hours}:${minutes}:${seconds}.${milliseconds}`
    }
}


module.exports = {
    TIMES,
    COLORS,
    TimeSpan,
}
