const express = require('express');

class ExpressService {
    constructor(config) {
        this.server = this.createServer();
        this.messages = config?.messages || {
            htmlResponse: '<h1>Servidor de internet NodeJS funcionando.</h1>',
            serverStarted: `> Servidor de internet NodeJS funcionando na porta {port}.`,
        }
    }

    createServer() {
        const server = express()

        server.all('/', async (_req, res) => {
            res.send(this.messages.htmlResponse)
        })

        return server
    }

    start(port = 3000) {
        this.server.listen(port, () => {
            console.log(this.messages.serverStarted.replace('{port}', port))
        })
    }
}

module.exports = ExpressService
