const { Client, Events, REST, Routes } = require("discord.js")
const logger = require("../utils/Logger")

const MessageService = require("./MessageService")
const EventService = require("./EventService")

class DiscordService extends Client {
    constructor(apiSettings = {}, configurations = {}) {
        super(apiSettings)

        this.prefix = configurations.prefix || process.env.PREFIX.toLowerCase()
        this.logger = configurations.logger || logger
        this.rest = configurations.rest || new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN)

        this.interactionHandler = configurations.interactionHandler || null
        this.messageService = configurations.messageService || new MessageService()
        this.eventService = configurations.eventService || EventService
    }

    onSetupForStart(callback) {
        this.eventService.onClientReady(this, callback)
    }

    onMessageCreate(callback) {
        this.eventService.onMessageCreate(this, callback)
    }

    onInteractionCreate(callback) {
        this.eventService.onInteractionCreate(this, callback)
    }

    async start(token) {
        this.on(Events.InteractionCreate, (interaction) => {
            this.interactionHandler.handleInteraction(interaction, this)
        })

        await this.loginInDiscordAPI(token)
    }

    async setupRestAPI(slashCommandsToRegister) {
        await this.rest.put(
            Routes.applicationCommands(this.user.id),
            { body: slashCommandsToRegister },
        )
            .then(() => this.logger.warn("[DEBUG] ::", "Slash Commands registrados com sucesso!", true))
            .catch((err) => this.logger.error("[FAIL] ::", "Falha ao registrar os Slash Commands : " + err, true))
    }

    async loginInDiscordAPI(token) {
        await this.login(token)
            .then(() => this.logger.warn("[DEBUG] ::", `Logado como ${this.user.tag}.\n`, true))
            .catch((err) => this.logger.error("[FAIL] ::", "Falha ao iniciar o bot : " + err, true))
    }
}

module.exports = DiscordService
