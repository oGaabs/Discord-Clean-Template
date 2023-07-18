require("dotenv").config() // Carrega as variáveis de ambiente
require('module-alias/register') // Carrega os aliases para os módulos

const { GatewayIntentBits } = require("discord.js")

const DiscordService = require("@infra/Services/DiscordService")
const CommandService = require("@application/CommandService")
const FileReader = require("@utils/CommandFileReader")
const InteractionHandler = require("@application/interactions/InteractionHandler")
const ExpressService = require('@infra/Services/ExpressService')

// Cria as instâncias das dependências
const fileReader = new FileReader()
const commandService = new CommandService(process.env.PREFIX, fileReader)
const interactionHandler = new InteractionHandler(commandService)
const expressService = new ExpressService()

const discordService = new DiscordService({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
})

// Configura as dependências
discordService.onSetupForStart((service) => {
    service.interactionHandler = interactionHandler
    service.commandHandler = commandService

    commandService.populateCommands("./src/application/slashcommands", service)
    commandService.populateListeners("./src/Infrastructure/listeners", service)
})

// Inicia a conexão com a API Discord
discordService.start(process.env.CLIENT_TOKEN)
expressService.start(process.env.PORT)
