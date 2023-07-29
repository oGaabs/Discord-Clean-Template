require("dotenv").config() // Carrega as variáveis de ambiente
require("module-alias/register") // Carrega os aliases para os módulos

const { GatewayIntentBits } = require("discord.js")

const DiscordService = require("@infra/services/discord/DiscordService")
const CommandManager = require("@application/CommandManager")
const FileReader = require("@utils/CommandFileReader")
const InteractionHandler = require("@application/interactions/InteractionHandler")
const ExpressService = require("@infra/services/express/ExpressService")

// Cria as instâncias das dependências
const fileReader = new FileReader()
const commandManager = new CommandManager(process.env.PREFIX, fileReader)
const interactionHandler = new InteractionHandler(commandManager)
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
    service.commandHandler = commandManager

    commandManager.populateCommands("./src/presentation/slashcommands", service)
    commandManager.populateListeners("./src/presentation/events", service)
    commandManager.registerTasks("./src/presentation/tasks", service)
})

// Inicia a conexão com a API Discord
discordService.start(process.env.CLIENT_TOKEN)
expressService.start(process.env.PORT)
