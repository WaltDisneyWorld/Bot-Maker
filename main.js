/**
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @license
 */

const { existsSync } = require('fs')
const Store = require('electron-store')
const { app, BrowserWindow, ipcMain, dialog, Notification } = require('electron')
const http = require('http')
const handler = require('serve-handler')

const DBCStaticPath = existsSync(__dirname + '/src')
  ? __dirname + '/static'
  : __dirname + '/build/static'
const DBCStore = new Store()

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
      nodeIntegration: true
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
      nodeIntegration: true
    }
  })

  loadWindow.loadFile(DBCStaticPath + '/html/load.html')
  loadWindow.webContents.once('did-finish-load', () => loadWindow.show())

  mainWindow.on('maximize', () =>
    mainWindow.webContents.send('main-window-maximize')
  )
  mainWindow.on('unmaximize', () =>
    mainWindow.webContents.send('main-window-unmaximize')
  )

  ipcMain.on('dbc-load', async () => {
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
  ipcMain.handle('get-app-path', () => {
    return app.getAppPath()
  })
  ipcMain.on('load-window-close', () => loadWindow.close())
  ipcMain.on('main-window-minimize', () => mainWindow.minimize())
  ipcMain.on('main-window-maximize', () => mainWindow.maximize())
  ipcMain.on('main-window-unmaximize', () => mainWindow.unmaximize())
  ipcMain.on('main-window-close', () => mainWindow.close())
  ipcMain.handle('main-window-is-maximized', () => {
    return mainWindow.isMaximized()
  })
  ipcMain.handle('main-window-is-focused', () => {
    return mainWindow.isFocused()
  })
  ipcMain.handle('show-directory-dialog', async () => { 
    return await dialog.showOpenDialog({
      properties: ['openDirectory']
    }) 
  })
  ipcMain.handle(
    'show-notification',
    (event, options) => new Notification(options).show() 
  )
  ipcMain.handle('store-get', (event, key) => {
    return DBCStore.get(key)
  })
  ipcMain.on('store-set', (event, key, value) => DBCStore.set(key, value))
}

startDBC()
