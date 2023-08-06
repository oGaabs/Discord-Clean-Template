require("dotenv").config() // Carrega as variáveis de ambiente

const { GatewayIntentBits } = require("discord.js")

const DiscordService = require("./infrastructure/services/discord/DiscordService")
const CommandManager = require("./application/CommandManager")
const FileReader = require("./infrastructure/utils/CommandFileReader")
const CommandHandler = require("./application/CommandHandler")
const ExpressService = require("./infrastructure/services/express/ExpressService")

// Cria as instâncias das dependências
const fileReader = new FileReader()
const commandManager = new CommandManager(fileReader, process.env.PREFIX)
const commandHandler = new CommandHandler(commandManager, process.env.PREFIX)
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
discordService.onSetupForStart(async (service) => {
    service.commandHandler = commandHandler

    await commandManager.populateSlashCommands("./src/presentation/slashcommands", service)
    await commandManager.populateListeners("./src/presentation/events", service)
    await commandManager.registerTasks("./src/presentation/tasks", service)
    await discordService.displayDashboard()
})

// Inicia a conexão com a API Discord
discordService.start(process.env.CLIENT_TOKEN)
expressService.start(process.env.PORT)
