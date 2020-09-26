import { homedir } from 'os'
import { remote } from 'electron'
import { existsSync, readFileSync } from 'fs'

const { app } = remote
const { getAppPath } = app

const homeDir = homedir().replace(/\\/g, '/') + '/.dbc'
const appPath = existsSync(getAppPath() + '/src')
  ? getAppPath()
  : getAppPath().endsWith('app.asar')
  ? getAppPath()
  : process.cwd()
const staticPath = existsSync(appPath + '/src')
  ? appPath + '/static'
  : appPath.endsWith('app.asar')
  ? appPath + '/build/static'
  : appPath

window.env = {
  DBC_VERSION: JSON.parse(readFileSync(appPath + '/package.json', 'utf-8'))
    .version,
  DBC_APP_PATH: appPath,
  DBC_STATIC_PATH: staticPath,
  DBC_HOME_PATH: homeDir,
  DBC_NODE_PATH:
    process.platform === 'win32'
      ? homeDir + '/node/node.exe'
      : homeDir + '/node/bin/node',
  DBC_NPM_PATH:
    process.platform === 'win32'
      ? homeDir + '/node/npm.cmd'
      : homeDir + '/node/bin/npm'
}
