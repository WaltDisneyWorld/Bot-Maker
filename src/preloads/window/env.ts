import { homedir } from 'os';

const osHomeDir = homedir()
  .replace(/\\/g, '/');

window.env = {
  DBC_VERSION: process.env.npm_package_version,
  DBC_PUBLIC_PATH: process.env.PUBLIC_URL,
  DBC_HOME_PATH: osHomeDir + '/.dbc',
  DBC_NODE_PATH: (() => {
    switch (process.platform) {
      case 'win32':
        return process.env.PUBLIC_URL + '/node/windows/node.exe';
      case 'linux':
        return process.env.PUBLIC_URL + '/node/linux-darwin/bin/node';
      case 'darwin':
        return process.env.PUBLIC_URL + '/node/linux-darwin/bin/node';
      default:
        break;
    }
  })(),
  DBC_NPM_PATH: (() => {
    switch (process.platform) {
      case 'win32':
        return process.env.PUBLIC_URL + '/node/windows/npm.cmd';
      case 'linux':
        return process.env.PUBLIC_URL + '/node/linux-darwin/bin/npm';
      case 'darwin':
        return process.env.PUBLIC_URL + '/node/linux-darwin/bin/npm';
      default:
        break;
    }
  })()
};
