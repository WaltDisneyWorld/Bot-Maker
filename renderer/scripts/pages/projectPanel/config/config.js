const { writeFile } = require('fs-extra')
const path = require('path')

export default function config (bot, project) {
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

  projectAvatarElem.value = bot.storage.config.avatar
  projectDescriptionElem.value = bot.storage.config.description
  projectBotOwnersElem.value = bot.storage.config.owners.join(', ')
  projectBotTokenElem.value = bot.storage.config.token
  projectBotPrefixElem.value = bot.storage.config.prefix
  projectBotCaseSensitiveElem.checked = bot.storage.config.caseSensitive
  for (const intent of bot.storage.config.intents) {
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

  const projectAvatarImgElem = document.querySelector('img')
  projectAvatarElem.onchange = () => {
    if (!projectAvatarElem.value) {
      projectAvatarElem.nextSibling.nextSibling.innerText =
        'Please fill out this field.'
    } else {
      projectAvatarElem.nextSibling.nextSibling.innerText = ''
      bot.storage.config.avatar = projectAvatarElem.value
      projectAvatarImgElem.src = projectAvatarElem.value
      writeFile(
        path.join(project.path, 'storage.json'),
        JSON.stringify(bot.storage, null, 2),
        'utf-8'
      )
    }
  }
  projectDescriptionElem.onchange = () => {
    if (!projectDescriptionElem.value) {
      projectDescriptionElem.nextSibling.nextSibling.innerText =
        'Please fill out this field.'
    } else {
      projectAvatarElem.nextSibling.nextSibling.innerText = ''
      bot.storage.config.description = projectDescriptionElem.value
      projectAvatarImgElem.title = `Name: ${project.name}\nDescription: ${bot.storage.config.description}`
      writeFile(
        path.join(project.path, 'storage.json'),
        JSON.stringify(bot.storage, null, 2),
        'utf-8'
      )
    }
  }
  projectBotOwnersElem.onchange = () => {
    bot.storage.config.owners = projectBotOwnersElem.value
      ? projectBotOwnersElem.value.split(', ')
      : []
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotTokenElem.onchange = () => {
    if (!projectBotTokenElem.value) {
      projectBotTokenElem.nextSibling.nextSibling.innerText =
        'Please fill out this field.'
    } else {
      projectAvatarElem.nextSibling.nextSibling.innerText = ''
      bot.storage.config.token = projectBotTokenElem.value
      writeFile(
        path.join(project.path, 'storage.json'),
        JSON.stringify(bot.storage, null, 2),
        'utf-8'
      )
    }
  }
  projectBotPrefixElem.onchange = () => {
    if (!projectBotPrefixElem.value) {
      projectBotPrefixElem.nextSibling.nextSibling.innerText =
        'Please fill out this field.'
    } else {
      projectBotPrefixElem.nextSibling.nextSibling.innerText = ''
      bot.storage.config.prefix = projectBotPrefixElem.value
      writeFile(
        path.join(project.path, 'storage.json'),
        JSON.stringify(bot.storage, null, 2),
        'utf-8'
      )
    }
  }
  projectBotCaseSensitiveElem.onchange = () => {
    bot.storage.config.caseSensitive = projectBotCaseSensitiveElem.checked
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildMembersElem.onchange = () => {
    if (projectBotIntentsGuildMembersElem.checked) {
      bot.storage.config.intents.push('GUILD_MEMBERS')
    } else {
      bot.storage.config.intents.splice(bot.storage.config.intents.indexOf('GUILD_MEMBERS'), 1)
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildBansElem.onchange = () => {
    if (projectBotIntentsGuildBansElem.checked) {
      bot.storage.config.intents.push('GUILD_BANS')
    } else {
      bot.storage.config.intents.splice(bot.storage.config.intents.indexOf('GUILD_BANS'), 1)
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildEmojisElem.onchange = () => {
    if (projectBotIntentsGuildEmojisElem.checked) {
      bot.storage.config.intents.push('GUILD_EMOJIS')
    } else {
      bot.storage.config.intents.splice(bot.storage.config.intents.indexOf('GUILD_EMOJIS'), 1)
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildIntegrationsElem.onchange = () => {
    if (projectBotIntentsGuildIntegrationsElem.checked) {
      bot.storage.config.intents.push('GUILD_INTEGRATIONS')
    } else {
      bot.storage.config.intents.splice(
        bot.storage.config.intents.indexOf('GUILD_INTEGRATIONS'),
        1
      )
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildWebhooksElem.onchange = () => {
    if (projectBotIntentsGuildWebhooksElem.checked) {
      bot.storage.config.intents.push('GUILD_WEBHOOKS')
    } else {
      bot.storage.config.intents.splice(bot.storage.config.intents.indexOf('GUILD_WEBHOOKS'), 1)
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildInvitesElem.onchange = () => {
    if (projectBotIntentsGuildInvitesElem.checked) {
      bot.storage.config.intents.push('GUILD_INVITES')
    } else {
      bot.storage.config.intents.splice(bot.storage.config.intents.indexOf('GUILD_INVITES'), 1)
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildVoiceStatesElem.onchange = () => {
    if (projectBotIntentsGuildVoiceStatesElem.checked) {
      bot.storage.config.intents.push('GUILD_VOICE_STATES')
    } else {
      bot.storage.config.intents.splice(
        bot.storage.config.intents.indexOf('GUILD_VOICE_STATES'),
        1
      )
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildPresencesElem.onchange = () => {
    if (projectBotIntentsGuildPresencesElem.checked) {
      bot.storage.config.intents.push('GUILD_PRESENCES')
    } else {
      bot.storage.config.intents.splice(
        bot.storage.config.intents.indexOf('GUILD_PRESENCES'),
        1
      )
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildMessageReactionsElem.onchange = () => {
    if (projectBotIntentsDirectMessageReactionsElem.checked) {
      bot.storage.config.intents.push('GUILD_MESSAGE_REACTIONS')
    } else {
      bot.storage.config.intents.splice(
        bot.storage.config.intents.indexOf('GUILD_MESSAGE_REACTIONS'),
        1
      )
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsGuildMessageTypingElem.onchange = () => {
    if (projectBotIntentsGuildMessageTypingElem.checked) {
      bot.storage.config.intents.push('GUILD_MESSAGE_TYPING')
    } else {
      bot.storage.config.intents.splice(
        bot.storage.config.intents.indexOf('GUILD_MESSAGE_TYPING'),
        1
      )
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsDirectMessagesElem.onchange = () => {
    if (projectBotIntentsDirectMessagesElem.checked) {
      bot.storage.config.intents.push('DIRECT_MESSAGES')
    } else {
      bot.storage.config.intents.splice(
        bot.storage.config.intents.indexOf('DIRECT_MESSAGES'),
        1
      )
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsDirectMessageReactionsElem.onchange = () => {
    if (projectBotIntentsDirectMessageReactionsElem.checked) {
      bot.storage.config.intents.push('DIRECT_MESSAGE_REACTIONS')
    } else {
      bot.storage.config.intents.splice(
        bot.storage.config.intents.indexOf('DIRECT_MESSAGE_REACTIONS'),
        1
      )
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
  projectBotIntentsDirectMessageTypingElem.onchange = () => {
    if (projectBotIntentsDirectMessageTypingElem.checked) {
      bot.storage.config.intents.push('DIRECT_MESSAGE_TYPING')
    } else {
      bot.storage.config.intents.splice(
        bot.storage.config.intents.indexOf('DIRECT_MESSAGE_TYPING'),
        1
      )
    }
    writeFile(
      path.join(project.path, 'storage.json'),
      JSON.stringify(bot.storage, null, 2),
      'utf-8'
    )
  }
}
