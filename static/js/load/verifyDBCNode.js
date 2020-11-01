/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { homedir } = require('os')
const {
  existsSync,
  mkdir,
  createWriteStream,
  unlink,
  rename,
  readdirSync,
  rmdirSync
} = require('fs-extra')
const https = require('https')
const { ipcRenderer } = require('electron')
const decompress = require('decompress')

const DBCHomeDir = homedir() + '/.dbc'

export default async function verifyDBCNode (version) {
  if (!existsSync(DBCHomeDir)) await mkdir(DBCHomeDir)

  function downloadNode (version, progress) {
    return new Promise(async (resolve) => {
      try {
        https.get(
          process.platform === 'win32'
            ? `https://nodejs.org/dist/v${version}/node-v${version}-win-x64.zip`
            : process.platform === 'linux'
            ? `https://nodejs.org/dist/v${version}/node-v${version}-linux-x64.zip`
            : `https://nodejs.org/dist/v${version}/node-v${version}-darwin-x64.tar.gz`,
          (res) => {
            const resLength = parseInt(res.headers['content-length'], 10)
            let resDownloaded = 0

            const nodeFilePath =
              process.platform === 'win32'
                ? DBCHomeDir + '/node.zip'
                : DBCHomeDir + '/node.tar.gz'
            const nodeFile = createWriteStream(nodeFilePath)

            res.pipe(nodeFile)
            res.on('data', (chunk) => {
              resDownloaded += chunk.length
              return progress(Math.floor((100 * resDownloaded) / resLength))
            })
            res.once('error', (err) => {
              alert('Unknown error: ' + err)
              ipcRenderer.send('load-window-close')
            })
            res.once('end', async () => {
              await decompress(nodeFilePath, DBCHomeDir)
              await unlink(nodeFilePath)
              await rename(
                DBCHomeDir +
                  '/' +
                  readdirSync(DBCHomeDir).find((i) => i.startsWith('node')),
                DBCHomeDir + '/node'
              )
              ipcRenderer.send('store-set', 'nodeVersion', version)
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
        ipcRenderer.send('load-window-close')
      }
    })
  }

  if (!existsSync(DBCHomeDir + '/node')) {
    window.setLoadMessage('Downloading dependencies (0%)', 13)

    const uncompletedNodeDownloadPath =
      DBCHomeDir +
      '/' +
      readdirSync(DBCHomeDir).find((i) => i.startsWith('node'))
    if (existsSync(uncompletedNodeDownloadPath)) {
      rmdirSync(uncompletedNodeDownloadPath, { recursive: true })
    }
    if (existsSync(DBCHomeDir + '/node.zip')) {
      await unlink(DBCHomeDir + '/node.zip')
    }

    await downloadNode(version, (progress) => {
      if (progress === 100) {
        window.setLoadMessage('Extracting dependencies')
      } else {
        window.setLoadMessage(
          'Downloading dependencies (' + progress + '%)',
          13
        )
      }
    })
  } else if (
    (await ipcRenderer.invoke('store-get', 'nodeVersion')) !== version
  ) {
    window.setLoadMessage('Updating dependencies (0%)')
    rmdirSync(DBCHomeDir + '/node', { recursive: true })
    await downloadNode(version, (progress) => {
      if (progress === 100) {
        window.setLoadMessage('Extracting dependencies')
      } else {
        window.setLoadMessage('Updating dependencies (' + progress + '%)')
      }
    })
  }
}
