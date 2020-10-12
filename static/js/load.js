/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { remote } = require('electron')
const { homedir } = require('os')
const {
  unlink,
  rename,
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

const { getCurrentWindow } = remote

const homeDir = homedir() + '/.dbc'
const store = new Store()
const loadWindow = getCurrentWindow()

function setLoadMessage (message) {
  document.querySelector('h5').innerText = message
}

async function verifyDBCNode (version) {
  function downloadNode (version) {
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
    setLoadMessage('Downloading dependencies')
    await downloadNode(version)
  } else if (store.get('nodeVersion') !== version) {
    setLoadMessage('Updating dependencies')
    rmdirSync(homeDir + '/node', { recursive: true })
    await downloadNode(version)
  }
}

verifyDBCNode('12.18.4').then(() => ipcRenderer.send('dbc-load'))
