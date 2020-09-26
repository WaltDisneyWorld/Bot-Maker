/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { remote } = require('electron')
const { homedir } = require('os')
const {
  readJSON,
  unlink,
  rename,
  move,
  existsSync,
  mkdir,
  createWriteStream,
  readdirSync,
  rmdirSync
} = require('fs-extra')
const https = require('https')
const decompress = require('decompress')
const Store = require('electron-store')
const { ipcRenderer } = require('electron')

const { getCurrentWindow, app } = remote
const { getAppPath } = app

const appPath = getAppPath()
const homeDir = homedir() + '/.dbc'
const store = new Store()
const loadWindow = getCurrentWindow()

function setLoadMessage(message) {
  document.querySelector('h5').innerText = message
}

function verifyDBCVersion() {
  return new Promise(async (resolve) => {
    if (!appPath.includes('app')) return resolve()

    const currentDBCVersion = (
      await (
        await fetch(
          'https://raw.githubusercontent.com/discord-bot-creator/discord-bot-creator/dev/package.json'
        )
      ).json()
    ).version
    const localDBCVersion = readJSON(appPath + '/package.json').version

    if (localDBCVersion !== currentDBCVersion) {
      try {
        setLoadMessage('Downloading update')

        https.get(
          `https://github.com/discord-bot-creator/discord-bot-creator/releases/download/${currentDBCVersion}/Discord.Bot.Creator-${currentDBCVersion}-${
            process.platform === 'win32' ? 'win' : process.platform
          }.${process.platform === 'win32' ? 'zip' : 'tar.gz'}`,
          (res) => {
            const DBCUpdateFilePath = `${homeDir}/dbc-update.${
              process.platform === 'win32' ? 'zip' : 'tar.gz'
            }`
            const DBCUpdateFile = createWriteStream(DBCUpdateFilePath)

            res.pipe(DBCUpdateFile)
            res.once('error', (err) => {
              alert('Unknown error: ' + err)
              loadWindow.close()
            })
            res.once('end', async () => {
              setLoadMessage('Installing update')

              await decompress(DBCUpdateFilePath, homeDir)
              await unlink(DBCUpdateFilePath)
              await rename(
                homeDir +
                  '/' +
                  readdirSync(homeDir).find((i) =>
                    i.startsWith('Discord Bot Creator')
                  ),
                homeDir + '/dbc-update'
              )
              await move(homeDir + '/dbc-update/resources/app.asar', appPath)
              await unlink(homeDir + '/dbc-update')

              alert(
                'Update installed, open your Discord Bot Creator again to use.'
              )
              loadWindow.close()
            })
          }
        )
      } catch (err) {
        alert(
          err.code === 'ENOTFOUND'
            ? 'Not was possible install the update, check if your connection is ok.'
            : 'Unknown error: ' + err
        )
        loadWindow.close()
      }
    }
  })
}

async function verifyDBCNode(version) {
  function downloadNode(version) {
    return new Promise(async (resolve) => {
      try {
        if (!existsSync(homeDir)) await mkdir(homeDir)

        https.get(
          process.platform === 'win32'
            ? `https://nodejs.org/dist/v${version}/node-v${version}-win-x64.zip`
            : process.platform === 'linux'
            ? `https://nodejs.org/dist/v${version}/node-v${version}-linux-x64.zip`
            : `https://nodejs.org/dist/v${version}/node-v${version}-darwin-x64.tar.gz`,
          (res) => {
            const nodeFilePath =
              process.platform === 'win32'
                ? homeDir + '/node.zip'
                : homeDir + '/node.tar.gz'
            const nodeFile = createWriteStream(nodeFilePath)

            res.pipe(nodeFile)
            res.once('error', (err) => {
              alert('Unknown error: ' + err)
              loadWindow.close()
            })
            res.once('end', async () => {
              await decompress(nodeFilePath, homeDir)
              await unlink(nodeFilePath)
              await rename(
                homeDir +
                  '/' +
                  readdirSync(homeDir).find((i) => i.startsWith('node')),
                homeDir + '/node'
              )
              store.set('nodeVersion', version)
              resolve()
            })
          }
        )
      } catch (err) {
        alert(
          err.code === 'ENOTFOUND'
            ? 'Not was possible install the required depedencies, check if your connection is ok.'
            : 'Unknown error: ' + err
        )
        loadWindow.close()
      }
    })
  }

  if (!existsSync(homeDir + '/node')) {
    setLoadMessage('Installing dependencies')
    await downloadNode(version)
  } else if (store.get('nodeVersion') !== version) {
    setLoadMessage('Updating dependencies')
    rmdirSync(homeDir + '/node', { recursive: true })
    await downloadNode(version)
  } else return ipcRenderer.send('dbc-load')
}

;(async () => {
  await verifyDBCVersion()
  await verifyDBCNode('12.18.3')
})()
