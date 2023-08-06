const log = require("ansi-colors")
const moment = require("moment")
moment.locale("pt-br")

class Logger {
    static getCurrentDateTime() {
        return moment().format("DD/MM, HH:mm:ss")
    }

    static log(title, content, shouldInsertDateTime = false) {
        if (shouldInsertDateTime)
            title = `[${this.getCurrentDateTime()}]\n${title}`


        console.log(title, content)
    }

    static debug(title, content, shouldInsertDateTime = false) {
        title = log.green(title)
        this.log(title, content, shouldInsertDateTime)
    }

    static error(title, content, shouldInsertDateTime = false) {
        title = log.redBright(title)
        content = log.red(content)
        this.log(title, content, shouldInsertDateTime)
    }

    static alert(title, content, shouldInsertDateTime = false) {
        this.error(title, content, shouldInsertDateTime)
    }

    static warn(title, content, shouldInsertDateTime = false) {
        title = log.bold.yellow(title)
        content = log.yellow(content)
        this.log(title, content, shouldInsertDateTime)
    }
}

module.exports = Logger
