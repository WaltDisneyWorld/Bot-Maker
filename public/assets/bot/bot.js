/**
 * Copyright (c) Discord Bot Creator.
 * 
 * This source code is licensed under the GPL-3.0.
 * 
 * @license
 */

/** 
 * DBC bot storage, include commands, 
 * events and configs. 
 */
const DBCBotStorage = require('./storage.json');

/** 
 * DBC bot actions, delimit
 * what the bot can do. 
 */
const DBCBotActions = [
  /** Messages */
  {
    name: 'Send Message',
    description: 'This action will send messages to channels, users and bot logs.',
    category: 'Messages',
    html(isCommand) {
      return `
        <div>
          <div>
            <label id="send-to">Send to</label>
            <select id="send-to" isDBCField>
              ${isCommand ? `
                <option value="command-channel">
                  Command Channel
                </option>
                <option value="command-author">
                  Command Author
                </option>
              ` : ''}
              <option value="bot-logs">Bot Logs</option>
              <option value="channel-user-variable">
                Channel/User Variable
              </option>
              <option value="channel-user-global-variable">
                Channel/User Global Variable
              </option>
            </select>
          </div>
          <div id="variable-name-container" style="display: none;">
            <label id="variable-name">Variable Name</label>
            <input id="variable-name" type="text" isDBCField>
          </div>
        </div>
        <div>
          <label id="message">Message</label>
          <textarea id="message" isDBCField></textarea>
        </div>
        <script>
          const messageSendTo = document
            .getElementById('message-send-to');
          const variableNameContainer = document
            .getElementById('variable-name-container');

          messageSendTo.addEventListener('select', e => {
            if (
              e.target.value === 'channel-user-variable' || 
              e.target.value === 'channel-user-global-variable'
            ) {
              variableNameContainer
                .style
                .display = '';
            } else {
              if (variableNameContainer.style.display !== 'none') {
                variableNameContainer
                  .style
                  .display = 'none';
              }
            }
          });
        </script>
      `;
    },
    async run(cache) {
      const sendTo = cache.getField(
        cache.index, 
        'send-to'
      );
      const variableName = cache.getField(
        cache.index,
        'variable-name'
      );
      const _message = cache.getField(
        cache.index, 
        'message'
      );

      try {
        switch (sendTo) {
          case 'command-channel':
            cache.message.channel.send(_message);
            break;
          case 'command-author':
            cache.message.author.send(_message);
            break;
          case 'bot-logs':
            console.log(_message);
            break;
          case 'channel-user-variable':
            cache.variables
              .get(variableName)
              .send(_message);
            break;
          case 'channel-user-global-variable':
            cache.globalVariables
              .get(variableName)
              .send(_message);
            break;
          default:
            break;
        }

        cache.goToAction(cache);
      } catch (err) {
        cache.goToAction(cache);
      }
    }
  },
  /** Others */
  {
    name: 'Create Variable',
    description: 'This action leave you create custom variables.',
    category: 'Others',
    html() {
      return `
        <div>
          <label id="variable-type">Variable Type</label>
          <select id="variable-type" isDBCField>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="list">List</option>
            <option value="true-false">True/false</option>
          </select>
        </div>
        <br>
        <div>
          <label id="variable-value">Variable Value</label>
          <textarea id="variable-value" isDBCField></textarea>
        </div>
        <br>
        <div>
          <div>
            <label id="variable-storage">Store in</label>
            <select id="variable-storage" isDBCField>
              <option value="temp">Variable</option>
              <option value="global">Global Variable</option>
            </select>
          </div>
          <div>
            <label id="variable-name">Variable Name</label>
            <input id="variable-name" type="text" isDBCField>
          </div>
        </div>
      `;
    },
    run(cache) {
      const variableType = cache.getField(
        cache.index, 
        'variable-type'
      );
      let variableValue = cache.getField(
        cache.index, 
        'variable-value'
      );
      const variableStorage = cache.getField(
        cache.index, 
        'variable-storage'
      );
      const variableName = cache.getField(
        cache.index, 
        'variable-name'
      );

      switch (variableType) {
        case 'text':
          variableValue = String(variableValue);
          break;
        case 'number':
          variableValue = Number(variableValue);
          break;
        case 'list':
          variableValue = Array(variableValue);
          break;
        case 'true-false':
          variableValue = Boolean(variableValue);
          break;
        default:
          break;
      }

      if (variableStorage === 'temp') {
        cache.variables.set(variableName, variableValue);
      } else {
        cache.globalVariables.set(variableName, variableValue);
      }

      cache.goToAction(cache);
    }
  },
  {
    name: 'Skip Actions',
    description: 'This action will skip a sequence of actions according with the ammount.',
    category: 'Others',
    html() {
      return `
        <div>
          <label id="ammount-to-skip">Ammount to Skip</label>
          <input id="ammount-to-skip" type="number" isDBCField>
        </div>
      `;
    },
    run(cache) {
      const ammountToSkip = Number(
        cache.getField(
          cache.index, 
          'ammount-to-skip'
        )
      );
      cache.index += ammountToSkip;
      cache.goToAction(cache);
    }
  },
  {
    name: 'Jump to Action',
    description: 'This action will jump to any selected action number, if exists.',
    categoy: 'Others',
    html() {
      return `
        <div>
          <label id="action-to-jump">Action to Jump</label>
          <input id="action-to-jump" type="number" isDBCField>
        </div>
      `;
    },
    run(cache) {
      const actionToJump = Number(
        cache.getField(
          cache.index,
          'action-to-jump'
        )
      );
      cache.index = actionToJump;
      cache.goToAction(cache);
    }
  },
  {
    name: 'Stop Actions',
    description: 'This action will stop all actions, that is, the actions sequence.',
    category: 'Others',
    html() {
      return ``;
    },
    run() {}
  }
];

class DBCBot {
  /**
   * Start the DBC Discord bot.
   * @param {string} token - Discord Bot Token Application.
   */
  constructor(token) {
    return (async () => {
      /** 
       * DBC bot client, Discord client used for 
       * controling the DBC bot. 
       */
      this.client = new this.libs.Discord.Client();

      this.globalVariables = new Map();

      /** Prepares commands system. */
      this.client.on('message', message => {
        if (
          !message.content.startsWith(this.storage.config.prefix) ||
          message.author.bot
        ) return;

        const commandArgs = message.content
          .slice(this.storage.config.prefix.length)
          .split(/ +/);
        const commandName = this.storage.config.caseSensivate ?
          commandArgs.shift().toLowerCase() :
          commandArgs.shift();
        const command = this.storage.commands
          .find(c => c.name === commandName) || this.storage.commands
          .find(c => c.aliases.includes(commandName));
        
        if (command) {
          const variables = new Map();
          const globalVariables = this.globalVariables;

          const log = this.utils.log;
        
          const actions = this.actions;
          const action = actions
            .find(a => a.name === command.actions[0].name);
        
          function getField(index, id) {
            const field = command
              .actions[index]
              .fields
              .find(f => f.id === id) || null;
            if (!field) return;

            const result = eval(`
              function variable(name) {
                return variables.get(name) || 
                globalVariables.get(name);
              }
              const command = message;
              ${'`' + field.value + '`'}
            `);
            
            return result;
          }

          function throwActionError(
            index, 
            commandName, 
            error
          ) {
            log(
              'error', 
              `Ocurred on command ${commandName} on action ${index}: ${error}`
            )
          }

          function goToAction(cache) {
            cache.index++;
            if (command.actions[cache.index]) {
              actions
                .find(a => a.name === command.actions[cache.index].name)
                .run(cache);
            }
          }

          /**
           * Action cache, necessary for actions 
           * to work and connect with each other.
           */
          const cache = {
            index: 0,
            variables,
            globalVariables,
            getField,
            throwActionError,
            libs: this.libs,
            client: this.client,
            message,
            goToAction
          };
        
          action.run(cache);
        }
      });

      /** Prepares events system. */
      this.storage.events.forEach(event => {
        this.client.on(event.type, (output0, output1) => {
          const variables = new Map();
          const globalVariables = this.globalVariables;

          if (event.outputs) {
            let outputIndex = 0;
            event.outputs.forEach(output => {
              if (output1 && outputIndex === 1) {
                variables.set(output, output1);
              } else {
                variables.set(output, output0);
              }
              outputIndex++;
            });
          }

          const log = this.utils.log;

          const actions = this.actions;
          const action = actions
            .find(a => a.name === event.actions[0].name);
        
          function getField(index, id) {
            const field = event
              .actions[index]
              .fields
              .find(f => f.id === id) || null;
            if (!field) return;

            const result = eval(`
              function variable(name) {
                return variables.get(name) || 
                globalVariables.get(name);
              }
              const command = message;
              ${'`' + field.value + '`'}
            `);
            
            return result;
          }

          function throwActionError(
            index, 
            eventName, 
            error
          ) {
            log(
              'error', 
              `Ocurred on event ${eventName} on action ${index}: ${error}`
            );
          }

          function goToAction(cache) {
            cache.index++;
            if (event.actions[cache.index]) {
              actions
                .find(a => a.name === event.actions[cache.index].name)
                .run(cache);
            }
          }

          /**
           * Action cache, necessary for actions 
           * to work and connect with each other.
           */
          const cache = {
            index: 0,
            variables,
            globalVariables,
            getField,
            throwActionError,
            libs: this.libs,
            client: this.client,
            goToAction
          };
        
          action.run(cache);
        });
      });

      try {
        console.clear();
        console.log('Starting bot...');
        
        await this.client.login(token);

        console.clear();
        this.utils.log('success', 'Bot started!');
      } catch (err) {
        console.clear();

        switch (err.code) {
          case 'TOKEN_INVALID':
            this.utils.log(
              'error',
              'You placed an invalid token in your bot config.'
            );
            break;
          default:
            this.utils.log(
              'error',
              'Unknown error: ' + err
            );
            break;
        }
      }
    })();
  }

  /** DBC/bot version. */
  get version() {
    return require('./package.json').version;
  }

  /** DBC bot libs, used libs of DBC bot. */
  get libs() {
    return {
      Discord: require('discord.js')
    };
  }

  /** 
   * DBC bot storage, including commands, 
   * events and configs. 
   */
  get storage() {
    return DBCBotStorage;
  }

  /** 
   * DBC bot actions, delimit
   * what the bot can do. 
   */
  get actions() {
    return DBCBotActions;
  }

  /** 
   * DBC bot utils, some useful functions and 
   * infos of DBC bot. 
   */
  get utils() {
    return {
      /**
       * A custom console logger.
       * @param {'info' | 'success' | 'error' | 'alert'} type 
       * @param {string} message 
       */
      log(type, message) {
        const dateNow = new Date();
        const logDate = `${dateNow.getMonth()}/${dateNow.getDate()}/${dateNow.getFullYear()} - ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
    
        switch (type) {
          case 'info':
            console.log(
              `[${logDate}] \x1b[36minfo\x1b[0m ${message}`
            );
            break;
          case 'success':
            console.log(
              `[${logDate}] \x1b[32msuccess\x1b[0m ${message}`
            );
            break;
          case 'error':
            console.error(
              `[${logDate}] \x1b[31merror\x1b[0m ${message}`
            );
            break;
          case 'alert':
            console.log(
              `[${logDate}] \x1b[33malert\x1b[0m ${message}`
            );
            break;
          default:
            break;
        }
      }
    };
  }
}

/** 
 * Only starts the bot when 
 * there execute directly.
 */
if (
  process.mainModule.filename.endsWith('bot.js')
) new DBCBot(DBCBotStorage.config.token);

/** 
 * Is necessary export the actions 
 * for use in the DBC.
 */
module.exports = DBCBotActions;
