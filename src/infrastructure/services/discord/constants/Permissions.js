const { PermissionFlagsBits } = require("discord.js")

const Permissions = {
    CreateInstantInvite: PermissionFlagsBits.CreateInstantInvite,
    KickMembers: PermissionFlagsBits.KickMembers,
    BanMembers: PermissionFlagsBits.BanMembers,
    Administrator: PermissionFlagsBits.Administrator,
    ManageChannels: PermissionFlagsBits.ManageChannels,
    ManageGuild: PermissionFlagsBits.ManageGuild,
    AddReactions: PermissionFlagsBits.AddReactions,
    ViewAuditLog: PermissionFlagsBits.ViewAuditLog,
    PrioritySpeaker: PermissionFlagsBits.PrioritySpeaker,
    Stream: PermissionFlagsBits.Stream,
    ViewChannel: PermissionFlagsBits.ViewChannel,
    SendMessages: PermissionFlagsBits.SendMessages,
    SendTTSMessages: PermissionFlagsBits.SendTTSMessages,
    ManageMessages: PermissionFlagsBits.ManageMessages,
    EmbedLinks: PermissionFlagsBits.EmbedLinks,
    AttachFiles: PermissionFlagsBits.AttachFiles,
    ReadMessageHistory: PermissionFlagsBits.ReadMessageHistory,
    MentionEveryone: PermissionFlagsBits.MentionEveryone,
    UseExternalEmojis: PermissionFlagsBits.UseExternalEmojis,
    ViewGuildInsights: PermissionFlagsBits.ViewGuildInsights,
    Connect: PermissionFlagsBits.Connect,
    Speak: PermissionFlagsBits.Speak,
    MuteMembers: PermissionFlagsBits.MuteMembers,
    DeafenMembers: PermissionFlagsBits.DeafenMembers,
    MoveMembers: PermissionFlagsBits.MoveMembers,
    UseVAD: PermissionFlagsBits.UseVAD,
    ChangeNickname: PermissionFlagsBits.ChangeNickname,
    ManageNicknames: PermissionFlagsBits.ManageNicknames,
    ManageRoles: PermissionFlagsBits.ManageRoles,
    ManageWebhooks: PermissionFlagsBits.ManageWebhooks,
    ManageGuildExpressions: PermissionFlagsBits.ManageGuildExpressions,
    UseApplicationCommands: PermissionFlagsBits.UseApplicationCommands,
    RequestToSpeak: PermissionFlagsBits.RequestToSpeak,
    ManageEvents: PermissionFlagsBits.ManageEvents,
    ManageThreads: PermissionFlagsBits.ManageThreads,
    CreatePublicThreads: PermissionFlagsBits.CreatePublicThreads,
    CreatePrivateThreads: PermissionFlagsBits.CreatePrivateThreads,
    UseExternalStickers: PermissionFlagsBits.UseExternalStickers,
    SendMessagesInThreads: PermissionFlagsBits.SendMessagesInThreads,
    UseEmbeddedActivities: PermissionFlagsBits.UseEmbeddedActivities,
    ModerateMembers: PermissionFlagsBits.ModerateMembers,
    ViewCreatorMonetizationAnalytics: PermissionFlagsBits.ViewCreatorMonetizationAnalytics,
    UseSoundboard: PermissionFlagsBits.UseSoundboard,
    UseExternalSounds: PermissionFlagsBits.UseExternalSounds,
    SendVoiceMessages: PermissionFlagsBits.SendVoiceMessages,
}

module.exports = Permissions
