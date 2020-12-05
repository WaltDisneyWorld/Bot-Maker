const { ipcRenderer } = require('electron')
const { join } = require('path')
const { homedir } = require('os')
const { pathExists, readFile } = require('fs-extra')

async function global () {
  const appPath = await ipcRenderer.invoke('get-app-path')
  const nodePath = join(homedir(), '.dbc', 'node')

  window.DBC = {
    appPath,
    rendererPath: pathExists(appPath + '/src')
      ? join(appPath, 'src', 'renderer')
      : join(appPath, 'build', 'renderer'),
    node:
      process.platform === 'win32'
        ? join(nodePath, 'node.exe')
        : join(nodePath, 'bin', 'node'),
    npm:
      process.platform === 'win32'
        ? join(nodePath, 'npm.cmd')
        : join(nodePath, 'bin', 'npm')
  }

  for (const elem of document.querySelectorAll('*[icon]')) {
    const svg = await readFile(
      join(
        window.DBC.appPath,
        'node_modules',
        '@discord-bot-creator',
        'icons',
        elem.getAttribute('icon') + '.svg'
      ),
      'utf-8'
    )
    elem.innerHTML = `${svg} ${elem.innerHTML}`
  }
}

global()
