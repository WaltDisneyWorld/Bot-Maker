/**
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @license
 */

const { app, BrowserWindow, ipcMain } = require('electron')
const { existsSync } = require('fs')
const http = require('http')
const handler = require('serve-handler')

const DBCStaticPath = existsSync(__dirname + '/src')
  ? __dirname + '/static'
  : __dirname + '/build/static'

async function startDBC () {
  await app.whenReady()

  const loadWindow = new BrowserWindow({
    show: false,
    center: true,
    frame: false,
    resizable: false,
    icon: DBCStaticPath + '/media/img/logo.png',
    title: 'Loading | Discord Bot Creator',
    width: 250,
    height: 255,
    backgroundColor: '#282a36',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true
    }
  })
  const mainWindow = new BrowserWindow({
    show: false,
    center: true,
    frame: false,
    icon: DBCStaticPath + '/media/img/logo.png',
    title: 'Discord Bot Creator',
    width: 800,
    height: 550,
    minWidth: 800,
    minHeight: 550,
    backgroundColor: '#282a36',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true
    }
  })

  ipcMain.once('dbc-load', async () => {
    if (existsSync(__dirname + '/src')) {
      mainWindow.loadURL('http://localhost:3000')
    } else {
      http
        .createServer((req, res) => {
          return handler(req, res, {
            public: __dirname + '/build'
          })
        })
        .listen(40000, () => mainWindow.loadURL('http://localhost:40000'))
    }
    mainWindow.webContents.once('did-finish-load', () => {
      loadWindow.close()
      mainWindow.show()
    })
  })

  loadWindow.loadFile(DBCStaticPath + '/html/load.html')
  loadWindow.webContents.once('did-finish-load', () => loadWindow.show())
}

startDBC()
