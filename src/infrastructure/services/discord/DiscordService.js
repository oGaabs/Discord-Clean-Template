const { Client, REST, Routes } = require("discord.js")
const logger = require("../../utils/Logger")

const MessageService = require("./MessageService")
const EventService = require("./EventService")

class DiscordService extends Client {
    constructor(apiSettings = {}, configurations = {}) {
        super(apiSettings)

        this.prefix = configurations.prefix || process.env.PREFIX.toLowerCase()
        this.logger = configurations.logger || logger
        this.rest = configurations.rest || new REST({ version: "10" }).setToken(process.env.CLIENT_TOKEN)

        this.commandHandler = configurations.commandHandler || null
        this.messageService = configurations.messageService || new MessageService()
        this.eventService = configurations.eventService || EventService
    }

    onSetupForStart(callback) {
        this.eventService.onClientReady(this, callback)
    }

    async start(token) {
        this.eventService.onInteractionCreate(this, (interaction) => {
            this.commandHandler.handleInteraction(interaction, this)
        })
        this.eventService.onMessageCreate(this, (message) => {
            this.commandHandler.handleMessageInteraction(message, this)
        })

        await this.loginInDiscordAPI(token)
    }

    async registerSlashCommands(commands) {
        await this.rest.put(
            Routes.applicationCommands(this.user.id),
            { body: commands },
        )
            .then(() => this.logger.warn("[DEBUG] ::", "Slash Commands registrados com sucesso!", true))
            .catch((err) => this.logger.error("[FAIL] ::", "Falha ao registrar os Slash Commands : " + err, true))
    }

    async registerSlashCommandsGuild(guildId, commands) {
        await this.rest.put(
            Routes.applicationGuildCommands(this.user.id, guildId),
            { body: commands },
        )
            .then(() => this.logger.warn("[DEBUG] ::", "Slash Commands registrados com sucesso!", true))
            .catch((err) => this.logger.error("[FAIL] ::", "Falha ao registrar os Slash Commands : " + err, true))
    }

    async loginInDiscordAPI(token) {
        await this.login(token)
            .then(() => this.logger.warn("[DEBUG] ::", `Logado como ${this.user.tag}.\n`, true))
            .catch((err) => this.logger.error("[FAIL] ::", "Falha ao iniciar o bot : " + err, true))
    }

    async logoutFromDiscordAPI() {
        await this.destroy()
            .then(() => this.logger.warn("[DEBUG] ::", "Deslogado do Discord.\n", true))
            .catch((err) => this.logger.error("[FAIL] ::", "Falha ao deslogar do Discord : " + err, true))
    }

    async getPing() {
        return this.ws.ping
    }

    async updatePresence(presense) {
        try {
            this.user.setPresence({
                activities: [{
                    name: presense.name,
                    type: presense.type,
                }],
                status: presense.status,
            })

            // this.logger.warn("[DEBUG] ::", "Presença atualizada com sucesso!", true)
        } catch (error) {
            this.logger.error("[FAIL] ::", "Falha ao atualizar a presença : " + error, true)
        }
    }
}

module.exports = DiscordService
