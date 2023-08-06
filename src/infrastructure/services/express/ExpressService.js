const ExpressApp = require("./ExpressApp")

class ExpressService {
    constructor(config = {}) {
        this.messages = config.messages || {
            htmlResponse: "<h1>Servidor de internet NodeJS funcionando.</h1>",
            serverStarted: "> Servidor de internet NodeJS funcionando na porta {port}.",
        }
    }

    start(port = 3000) {
        const app = new ExpressApp(this.messages.htmlResponse)
        app.start(port, () => {
            console.log(this.messages.serverStarted.replace("{port}", port))
        })
    }
}

module.exports = ExpressService
