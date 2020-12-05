import changeLoadMessage from './changeLoadMessage.js'

const { homedir } = require('os')
const {
  pathExists,
  mkdir,
  createWriteStream,
  remove,
  move,
  readdir
} = require('fs-extra')
const https = require('https')
const { ipcRenderer } = require('electron')
const decompress = require('decompress')

const DBCHomeDir = homedir() + '/.dbc'

export default async function verifyDBCNode (version) {
  if (!(await pathExists(DBCHomeDir))) await mkdir(DBCHomeDir)

  function downloadNode (version, progress) {
    return new Promise((resolve) => {
      try {
        https.get(
          process.platform === 'win32'
            ? `https://nodejs.org/dist/v${version}/node-v${version}-win-x64.zip`
            : process.platform === 'linux'
              ? `https://nodejs.org/dist/v${version}/node-v${version}-linux-x64.tar.gz`
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
              window.alert('Unknown error: ' + err)
              ipcRenderer.send('load-window-close')
            })
            res.once('end', async () => {
              await decompress(nodeFilePath, DBCHomeDir)
              await remove(nodeFilePath)
              await move(
                DBCHomeDir +
                  '/' +
                  (await readdir(DBCHomeDir)).find((i) => i.startsWith('node')),
                DBCHomeDir + '/node'
              )
              ipcRenderer.send('store-set', 'nodeVersion', version)
              resolve()
            })
          }
        )
      } catch (err) {
        window.alert(
          err.code === 'ENOTFOUND'
            ? 'Not was possible install the required depedencies, check if your connection is ok.'
            : 'Unknown error: ' + err
        )
        ipcRenderer.send('load-window-close')
      }
    })
  }

  if (!(await pathExists(DBCHomeDir + '/node'))) {
    changeLoadMessage('Downloading dependencies (0%)', 13)

    const uncompletedNodeDownloadPath =
      DBCHomeDir +
      '/' +
      (await readdir(DBCHomeDir)).find((i) => i.startsWith('node'))
    if (await pathExists(uncompletedNodeDownloadPath)) {
      await remove(uncompletedNodeDownloadPath)
    }
    if (await pathExists(DBCHomeDir + '/node.zip')) {
      await remove(DBCHomeDir + '/node.zip')
    }

    await downloadNode(version, (progress) => {
      if (progress === 100) {
        changeLoadMessage('Extracting dependencies', 14)
      } else {
        changeLoadMessage('Downloading dependencies (' + progress + '%)', 13)
      }
    })
  } else if (
    (await ipcRenderer.invoke('store-get', 'nodeVersion')) !== version
  ) {
    changeLoadMessage('Updating dependencies (0%)', 14)
    await remove(DBCHomeDir + '/node')
    await downloadNode(version, (progress) => {
      if (progress === 100) {
        changeLoadMessage('Extracting dependencies', 14)
      } else {
        changeLoadMessage('Updating dependencies (' + progress + '%)', 14)
      }
    })
  }
}
