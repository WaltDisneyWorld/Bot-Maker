export default function config () {
  const projectAvatarElem = document.getElementById('project-avatar')
  const projectDescriptionElem = document.getElementById('project-description')
  const projectBotOwnersElem = document.getElementById('project-bot-owners')
  const projectBotTokenElem = document.getElementById('project-bot-token')
  const projectBotPrefixElem = document.getElementById('project-bot-prefix')
  const projectBotCaseSensitiveElem = document.getElementById(
    'project-bot-case-sensitive'
  )
  const projectBotIntentsGuildsElem = document.getElementById(
    'project-bot-intents-guilds'
  )
  const projectBotIntentsGuildMembersElem = document.getElementById(
    'project-bot-intents-guild-members'
  )
  const projectBotIntentsGuildBansElem = document.getElementById(
    'project-bot-intents-guild-bans'
  )
  const projectBotIntentsGuildEmojisElem = document.getElementById(
    'project-bot-intents-guild-emojis'
  )
  const projectBotIntentsGuildIntegrationsElem = document.getElementById(
    'project-bot-intents-guild-integrations'
  )
  const projectBotIntentsGuildWebhooksElem = document.getElementById(
    'project-bot-intents-guild-webhooks'
  )
  const projectBotIntentsGuildInvitesElem = document.getElementById(
    'project-bot-intents-guild-invites'
  )
  const projectBotIntentsGuildVoiceStatesElem = document.getElementById(
    'project-bot-intents-guild-voice-states'
  )
  const projectBotIntentsGuildPresencesElem = document.getElementById(
    'project-bot-intents-guild-presences'
  )
  const projectBotIntentsGuildMessagesElem = document.getElementById(
    'project-bot-intents-guild-messages'
  )
  const projectBotIntentsGuildMessageReactionsElem = document.getElementById(
    'project-bot-intents-guild-message-reactions'
  )
  const projectBotIntentsGuildMessageTypingElem = document.getElementById(
    'project-bot-intents-guild-message-typing'
  )
  const projectBotIntentsDirectMessagesElem = document.getElementById(
    'project-bot-intents-direct-messages'
  )
  const projectBotIntentsDirectMessageReactionsElem = document.getElementById(
    'project-bot-intents-direct-message-reactions'
  )
  const projectBotIntentsDirectMessageTypingElem = document.getElementById(
    'project-bot-intents-direct-message-typing'
  )

  projectAvatarElem.value = window.bot.storage.config.avatar
  projectDescriptionElem.value = window.bot.storage.config.description
  projectBotOwnersElem.value = window.bot.storage.config.owners.join(', ')
  projectBotTokenElem.value = window.bot.storage.config.token
  projectBotPrefixElem.value = window.bot.storage.config.prefix
  projectBotCaseSensitiveElem.checked = window.bot.storage.config.caseSensitive
  for (const intent of window.bot.storage.config.intents) {
    switch (intent) {
      case 'GUILDS':
        projectBotIntentsGuildsElem.checked = true
        break
      case 'GUILD_MEMBERS':
        projectBotIntentsGuildMembersElem.checked = true
        break
      case 'GUILD_BANS':
        projectBotIntentsGuildBansElem.checked = true
        break
      case 'GUILD_EMOJIS':
        projectBotIntentsGuildEmojisElem.checked = true
        break
      case 'GUILD_INTEGRATIONS':
        projectBotIntentsGuildIntegrationsElem.checked = true
        break
      case 'GUILD_WEBHOOKS':
        projectBotIntentsGuildWebhooksElem.checked = true
        break
      case 'GUILD_INVITES':
        projectBotIntentsGuildInvitesElem.checked = true
        break
      case 'GUILD_VOICE_STATES':
        projectBotIntentsGuildVoiceStatesElem.checked = true
        break
      case 'GUILD_PRESENCES':
        projectBotIntentsGuildPresencesElem.checked = true
        break
      case 'GUILD_MESSAGES':
        projectBotIntentsGuildMessagesElem.checked = true
        break
      case 'GUILD_MESSAGE_REACTIONS':
        projectBotIntentsGuildMessageReactionsElem.checked = true
        break
      case 'GUILD_MESSAGE_TYPING':
        projectBotIntentsGuildMessageTypingElem.checked = true
        break
      case 'DIRECT_MESSAGES':
        projectBotIntentsDirectMessagesElem.checked = true
        break
      case 'DIRECT_MESSAGE_REACTIONS':
        projectBotIntentsDirectMessageReactionsElem.checked = true
        break
      case 'DIRECT_MESSAGE_TYPING':
        projectBotIntentsDirectMessageTypingElem.checked = true
        break
    }
  }

  projectAvatarElem.onchange = () => {
    window.bot.storage.config.avatar = projectAvatarElem.value
  }
  projectDescriptionElem.onchange = () => {
    window.bot.storage.config.description = projectDescriptionElem.value
  }
  projectBotOwnersElem.onchange = () => {
    window.bot.storage.config.owners = projectBotOwnersElem.value
      ? projectBotOwnersElem.value.split(', ')
      : []
  }
  projectBotTokenElem.onchange = () => {
    window.bot.storage.config.token = projectBotTokenElem.value
  }
  projectBotPrefixElem.onchange = () => {
    window.bot.storage.config.prefix = projectBotPrefixElem.value
  }
  projectBotCaseSensitiveElem.onchange = () => {
    window.bot.storage.config.caseSensitive =
      projectBotCaseSensitiveElem.checked
  }
  projectBotIntentsGuildMembersElem.onchange = () => {
    if (projectBotIntentsGuildMembersElem.checked) {
      window.bot.storage.config.intents.push('GUILD_MEMBERS')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_MEMBERS'),
        1
      )
    }
  }
  projectBotIntentsGuildBansElem.onchange = () => {
    if (projectBotIntentsGuildBansElem.checked) {
      window.bot.storage.config.intents.push('GUILD_BANS')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_BANS'),
        1
      )
    }
  }
  projectBotIntentsGuildEmojisElem.onchange = () => {
    if (projectBotIntentsGuildEmojisElem.checked) {
      window.bot.storage.config.intents.push('GUILD_EMOJIS')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_EMOJIS'),
        1
      )
    }
  }
  projectBotIntentsGuildIntegrationsElem.onchange = () => {
    if (projectBotIntentsGuildIntegrationsElem.checked) {
      window.bot.storage.config.intents.push('GUILD_INTEGRATIONS')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_INTEGRATIONS'),
        1
      )
    }
  }
  projectBotIntentsGuildWebhooksElem.onchange = () => {
    if (projectBotIntentsGuildWebhooksElem.checked) {
      window.bot.storage.config.intents.push('GUILD_WEBHOOKS')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_WEBHOOKS'),
        1
      )
    }
  }
  projectBotIntentsGuildInvitesElem.onchange = () => {
    if (projectBotIntentsGuildInvitesElem.checked) {
      window.bot.storage.config.intents.push('GUILD_INVITES')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_INVITES'),
        1
      )
    }
  }
  projectBotIntentsGuildVoiceStatesElem.onchange = () => {
    if (projectBotIntentsGuildVoiceStatesElem.checked) {
      window.bot.storage.config.intents.push('GUILD_VOICE_STATES')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_VOICE_STATES'),
        1
      )
    }
  }
  projectBotIntentsGuildPresencesElem.onchange = () => {
    if (projectBotIntentsGuildPresencesElem.checked) {
      window.bot.storage.config.intents.push('GUILD_PRESENCES')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_PRESENCES'),
        1
      )
    }
  }
  projectBotIntentsGuildMessageReactionsElem.onchange = () => {
    if (projectBotIntentsDirectMessageReactionsElem.checked) {
      window.bot.storage.config.intents.push('GUILD_MESSAGE_REACTIONS')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_MESSAGE_REACTIONS'),
        1
      )
    }
  }
  projectBotIntentsGuildMessageTypingElem.onchange = () => {
    if (projectBotIntentsGuildMessageTypingElem.checked) {
      window.bot.storage.config.intents.push('GUILD_MESSAGE_TYPING')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('GUILD_MESSAGE_TYPING'),
        1
      )
    }
  }
  projectBotIntentsDirectMessagesElem.onchange = () => {
    if (projectBotIntentsDirectMessagesElem.checked) {
      window.bot.storage.config.intents.push('DIRECT_MESSAGES')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('DIRECT_MESSAGES'),
        1
      )
    }
  }
  projectBotIntentsDirectMessageReactionsElem.onchange = () => {
    if (projectBotIntentsDirectMessageReactionsElem.checked) {
      window.bot.storage.config.intents.push('DIRECT_MESSAGE_REACTIONS')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('DIRECT_MESSAGE_REACTIONS'),
        1
      )
    }
  }
  projectBotIntentsDirectMessageTypingElem.onchange = () => {
    if (projectBotIntentsDirectMessageTypingElem.checked) {
      window.bot.storage.config.intents.push('DIRECT_MESSAGE_TYPING')
    } else {
      window.bot.storage.config.intents.splice(
        window.bot.storage.config.intents.indexOf('DIRECT_MESSAGE_TYPING'),
        1
      )
    }
  }
}
