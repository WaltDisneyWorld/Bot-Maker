const { ipcRenderer } = require('electron')
const { homedir } = require('os')
const path = require('path')
const { readFile } = require('fs-extra')

async function global () {
  window.DBC = {
    appPath: await ipcRenderer.invoke('get-app-path'),
    node:
      process.platform === 'win32'
        ? path.join(homedir(), '.dbc', 'node', 'node.exe')
        : path.join(homedir(), '.dbc', 'node', 'bin', 'node'),
    npm:
      process.platform === 'win32'
        ? path.join(homedir(), '.dbc', 'node', 'npm.cmd')
        : path.join(homedir(), '.dbc', 'node', 'bin', 'npm')
  }

  for (const elem of document.querySelectorAll('*[icon]')) {
    const svg = await readFile(
      path.join(
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
