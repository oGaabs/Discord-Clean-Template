const { Events } = require("discord.js")

class EventService {
    /**
     * Evento disparado quando o cliente está pronto para começar a trabalhar.
     * @param {Client} client - O cliente do Discord
     * @param {String} event - O evento a ser observado
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static handleEvent(client, event, callback, performOneTime) {
        if (performOneTime) {
            client.once(event, callback)
            return
        }

        client.on(event, callback)
    }

    // ================== Client Events ==================
    /**
     * Evento disparado quando o cliente está pronto para começar a trabalhar.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onClientReady(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ClientReady, callback, performOneTime)
    }


    /**
     * Evento disparado quando um aviso é emitido pelo cliente.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onClientWarn(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ClientWarn, callback, performOneTime)
    }


    // ================== Interaction Events ==================
    /**
     * Evento disparado quando uma interação (comando) é criada.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onInteractionCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.InteractionCreate, callback, performOneTime)
    }


    // ================== Message Events ==================
    /**
     * Evento disparado quando uma mensagem é enviada no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onMessageCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.MessageCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma mensagem é excluída no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onMessageDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.MessageDelete, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma mensagem é atualizada no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onMessageUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.MessageUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando várias mensagens são excluídas de uma vez no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onMessageBulkDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.MessageBulkDelete, callback, performOneTime)
    }


    // ================== Message - Reaction Events ==================
    /**
     * Evento disparado quando uma reação é adicionada a uma mensagem no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onMessageReactionAdd(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.MessageReactionAdd, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma reação é removida de uma mensagem no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onMessageReactionRemove(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.MessageReactionRemove, callback, performOneTime)
    }

    /**
     * Evento disparado quando todas as reações são removidas de uma mensagem no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onMessageReactionRemoveAll(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.MessageReactionRemoveAll, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma reação específica é removida de uma mensagem no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onMessageReactionRemoveEmoji(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.MessageReactionRemoveEmoji, callback, performOneTime)
    }


    // ================== Presence Events ==================
    /**
     * Evento disparado quando a presença de um membro é atualizada no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onPresenceUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.PresenceUpdate, callback, performOneTime)
    }


    // ================== User Events ==================

    /**
     * Evento disparado quando um usuário é atualizado.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onUserUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.UserUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um usuário começa a digitar em um canal de texto.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onTypingStart(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.TypingStart, callback, performOneTime)
    }

    // ================== Channel Events ==================
    /**
     * Evento disparado quando um novo canal é criado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onChannelCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ChannelCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um canal é excluído no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onChannelDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ChannelDelete, callback, performOneTime)
    }

    /**
     * Evento disparado quando um canal no servidor é atualizado.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onChannelUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ChannelUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando os pins de um canal são atualizados.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onChannelPinsUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ChannelPinsUpdate, callback, performOneTime)
    }


    // ================== Channel - Thread Events ==================
    /**
     * Evento disparado quando um novo thread é criado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onThreadCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ThreadCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um thread é excluído no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onThreadDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ThreadDelete, callback, performOneTime)
    }

    /**
     * Evento disparado quando um thread é atualizado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onThreadUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ThreadUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando a lista de threads é sincronizada no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onThreadListSync(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ThreadListSync, callback, performOneTime)
    }

    /**
     * Evento disparado quando um membro é atualizado em um thread.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onThreadMemberUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ThreadMemberUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando a lista de membros em uma thread é atualizada.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onThreadMembersUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ThreadMembersUpdate, callback, performOneTime)
    }


    // ================== Voice Events ==================
    /**
     * Evento disparado quando a informação do servidor de voz é atualizada.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onVoiceServerUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.VoiceServerUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando o estado de voz de um membro é atualizado.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onVoiceStateUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.VoiceStateUpdate, callback, performOneTime)
    }


    // ==================  Voice Channel - Stage Instance Events ==================
    /**
     * Evento disparado quando uma instância de palco é criada em um canal de voz.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onStageInstanceCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.StageInstanceCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma instância de palco é atualizada em um canal de voz.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onStageInstanceUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.StageInstanceUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma instância de palco é excluída de um canal de voz.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onStageInstanceDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.StageInstanceDelete, callback, performOneTime)
    }


    // ================== Error Events ==================
    /**
     * Evento disparado quando ocorre um erro no cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onError(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.Error, callback, performOneTime)
    }

    /**
     * Evento disparado quando um aviso é emitido pelo cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onWarn(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.Warn, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma mensagem de debug é emitida pelo cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onDebug(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.Debug, callback, performOneTime)
    }

    /**
     * Evento disparado quando a limpeza do cache ocorre no cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onCacheSweep(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.CacheSweep, callback, performOneTime)
    }


    // ================== Shard Events ==================
    /**
     * Evento disparado quando um shard é desconectado do cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onShardDisconnect(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ShardDisconnect, callback, performOneTime)
    }

    /**
     * Evento disparado quando ocorre um erro em um shard do cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onShardError(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ShardError, callback, performOneTime)
    }

    /**
     * Evento disparado quando um shard está reconectando no cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onShardReconnecting(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ShardReconnecting, callback, performOneTime)
    }

    /**
     * Evento disparado quando um shard está pronto no cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onShardReady(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ShardReady, callback, performOneTime)
    }

    /**
     * Evento disparado quando um shard é resumido no cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onShardResume(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ShardResume, callback, performOneTime)
    }


    // ==================  Guild Events ==================
    /**
     * Evento disparado quando um servidor é criado.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um servidor é excluído ou o bot é removido de um servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildDelete, callback, performOneTime)
    }

    /**
     * Evento disparado quando um servidor é atualizado.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildUpdate, callback, performOneTime)
    }


    // ================== Guild - Guild Member Events ==================
    /**
     * Evento disparado quando um novo membro entra no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildMemberAdd(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildMemberAdd, callback, performOneTime)
    }

    /**
     * Evento disparado quando um membro é removido do servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildMemberRemove(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildMemberRemove, callback, performOneTime)
    }

    /**
     * Evento disparado quando um membro do servidor é atualizado.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildMemberUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildMemberUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um membro do servidor fica disponível.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildMemberAvailable(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildMemberAvailable, callback, performOneTime)
    }

    // ================== Guild - Ban Events ==================
    /**
     * Evento disparado quando um membro é banido do servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildBanAdd(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildBanAdd, callback, performOneTime)
    }

    /**
     * Evento disparado quando um membro é desbanido do servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildBanRemove(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildBanRemove, callback, performOneTime)
    }


    // ================== Guild - Audit Log Events ==================
    /**
     * Evento disparado quando uma entrada de log de auditoria é criada em um servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildAuditLogEntryCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildAuditLogEntryCreate, callback, performOneTime)
    }


    // ================== Guild - Role Events ==================
    /**
     * Evento disparado quando um cargo é criado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildRoleCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildRoleCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um cargo é excluído do servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildRoleDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildRoleDelete, callback, performOneTime)
    }

    /**
     * Evento disparado quando um cargo é atualizado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildRoleUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildRoleUpdate, callback, performOneTime)
    }


    // ================== Guild - Invite Events ==================
    /**
     * Evento disparado quando um convite é criado em um servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onInviteCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.InviteCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um convite é excluído de um servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onInviteDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.InviteDelete, callback, performOneTime)
    }


    // ==================  Guild - Guild Sticker Events ==================
    /**
     * Evento disparado quando um adesivo é criado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildStickerCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildStickerCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um adesivo é atualizado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildStickerUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildStickerUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um adesivo é excluído do servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildStickerDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildStickerDelete, callback, performOneTime)
    }


    // ================== Guild - Emoji Events ==================
    /**
     * Evento disparado quando um emoji é criado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildEmojiCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildEmojiCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um emoji é excluído do servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildEmojiDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildEmojiDelete, callback, performOneTime)
    }

    /**
     * Evento disparado quando um emoji no servidor é atualizado.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildEmojiUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildEmojiUpdate, callback, performOneTime)
    }


    // ==================  Guild - Guild Scheduled Event Events ==================
    /**
     * Evento disparado quando um evento agendado é criado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildScheduledEventCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildScheduledEventCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um evento agendado é atualizado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildScheduledEventUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildScheduledEventUpdate, callback, performOneTime)
    }

    /**
     * Evento disparado quando um evento agendado é excluído do servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildScheduledEventDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildScheduledEventDelete, callback, performOneTime)
    }

    /**
     * Evento disparado quando um usuário é adicionado a um evento agendado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildScheduledEventUserAdd(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildScheduledEventUserAdd, callback, performOneTime)
    }

    /**
     * Evento disparado quando um usuário é removido de um evento agendado no servidor.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildScheduledEventUserRemove(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildScheduledEventUserRemove, callback, performOneTime)
    }


    // ================== Guild - Miscelaneous Events ==================
    /**
     * Evento disparado quando um servidor fica indisponível, possivelmente devido a uma interrupção temporária.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildUnavailable(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildUnavailable, callback, performOneTime)
    }

    /**
     * Evento disparado quando membros de um servidor são recebidos em massa.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildMembersChunk(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildMembersChunk, callback, performOneTime)
    }

    /**
     * Evento disparado quando as integrações de um servidor são atualizadas.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onGuildIntegrationsUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.GuildIntegrationsUpdate, callback, performOneTime)
    }


    // ================== Webhook Event ==================
    /**
     * Evento disparado quando um webhook é atualizado em um canal.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onWebhooksUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.WebhooksUpdate, callback, performOneTime)
    }


    // ================== Auto Moderation Events ==================
    /**
     * Evento disparado quando uma ação de moderação automática é executada.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onAutoModerationActionExecution(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.AutoModerationActionExecution, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma regra de moderação automática é criada.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onAutoModerationRuleCreate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.AutoModerationRuleCreate, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma regra de moderação automática é excluída.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onAutoModerationRuleDelete(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.AutoModerationRuleDelete, callback, performOneTime)
    }

    /**
     * Evento disparado quando uma regra de moderação automática é atualizada.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onAutoModerationRuleUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.AutoModerationRuleUpdate, callback, performOneTime)
    }


    // ================== Application Command Events ==================
    /**
     * Evento disparado quando as permissões de um comando de aplicativo são atualizadas.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onApplicationCommandPermissionsUpdate(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.ApplicationCommandPermissionsUpdate, callback, performOneTime)
    }


    // ==================  Miscellaneous Events ==================
    /**
     * Evento disparado quando o cliente do Discord é invalidado.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onInvalidated(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.Invalidated, callback, performOneTime)
    }

    /**
     * Evento disparado quando ocorre um evento bruto não tratado pelo cliente do Discord.
     * @param {Client} client - O cliente do Discord
     * @param {Function} callback - A função de retorno de chamada a ser executada quando o evento ocorrer
     * @param {boolean} performOneTime - Define se o evento deve ser executado apenas uma vez
     */
    static onRaw(client, callback, performOneTime = false) {
        this.handleEvent(client, Events.Raw, callback, performOneTime)
    }
}

module.exports = EventService
