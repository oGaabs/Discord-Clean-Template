const express = require("express")

class ExpressApp {
    constructor(htmlResponse) {
        this.app = express()
        this.configureRoutes(htmlResponse)
    }

    configureRoutes(htmlResponse) {
        this.app.all("/", async (_req, res) => {
            res.send(htmlResponse)
        })
    }

    start(port, callback) {
        this.app.listen(port, callback)
    }
}

module.exports = ExpressApp
