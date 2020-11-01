import { ipcRenderer } from 'electron'
import { homedir } from 'os'
import { existsSync, readFileSync } from 'fs'

(async () => {
  const appPath_ = await ipcRenderer.invoke('get-app-path')
  const DBCHomeDir = homedir() + '/.dbc'
  const appPath = existsSync(appPath_ + '/src')
    ? appPath_
    : appPath_.endsWith('app.asar')
    ? appPath_
    : process.cwd()
  const staticPath = existsSync(appPath_ + '/src')
    ? appPath_ + '/static'
    : appPath_.endsWith('app.asar')
    ? appPath_ + '/build/static'
    : appPath_

  window.DBC.env = {
    DBC_VERSION: JSON.parse(readFileSync(appPath + '/package.json', 'utf-8'))
      .version,
    DBC_APP_PATH: appPath,
    DBC_STATIC_PATH: staticPath,
    DBC_HOME_PATH: DBCHomeDir,
    DBC_NODE_PATH:
      process.platform === 'win32'
        ? DBCHomeDir + '/node/node.exe'
        : DBCHomeDir + '/node/bin/node',
    DBC_NPM_PATH:
      process.platform === 'win32'
        ? DBCHomeDir + '/node/npm.cmd'
        : DBCHomeDir + '/node/bin/npm'
  }
})()
