class PermissionService {
    constructor(member, botUser) {
        this.member = member
        this.botUser = botUser
    }

    hasPermission(permission) {
        return this.member.permissions.has(permission)
    }

    hasPermissions(permissions) {
        for (const permission of permissions) {
            if (!this.member.permissions.has(permission))
                return false
        }
        return true
    }

    isRoleBelowBotHighestRole(botUser, role) {
        const botHighestRole = botUser.roles.highest
        return botHighestRole.position > role.position
    }
}

module.exports = PermissionService
