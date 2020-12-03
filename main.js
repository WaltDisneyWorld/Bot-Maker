/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Notification
} = require('electron')
const path = require('path')
const Store = require('electron-store')
const { pathExists } = require('fs-extra')

app.once('ready', () => {
  const loadWindow = new BrowserWindow({
    show: false,
    center: true,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, '/resources/icon.png'),
    title: 'Loading | Discord Bot Creator',
    width: 250,
    height: 255,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const startWindow = new BrowserWindow({
    show: false,
    center: true,
    resizable: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '/resources/icon.png'),
    title: 'Discord Bot Creator',
    width: 610,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const creatingProjctModal = new BrowserWindow({
    show: false,
    center: true,
    resizable: false,
    modal: true,
    parent: startWindow,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '/resources/icon.png'),
    title: 'Discord Bot Creator | Creating Project',
    width: 480,
    height: 640,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const projectPanelWindow = new BrowserWindow({
    show: false,
    center: true,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '/resources/icon.png'),
    title: 'Discord Bot Creator | Project Panel',
    webPreferences: {
      nodeIntegration: true
    }
  })

  const DBCStore = new Store()

  loadWindow.loadFile(path.join(__dirname, '/renderer/pages/load.html'))
  loadWindow.webContents.once('did-finish-load', () => loadWindow.show())

  startWindow.on('close', () => {
    creatingProjctModal.destroy()
    projectPanelWindow.destroy()
  })
  creatingProjctModal.on('close', (e) => {
    e.preventDefault()
    creatingProjctModal.hide()
  })
  projectPanelWindow.on('close', () => {
    startWindow.destroy()
    creatingProjctModal.destroy()
  })

  ipcMain.once('dbc-loaded', async () => {
    startWindow.loadFile(path.join(__dirname, '/renderer/pages/start.html'))
    startWindow.webContents.once('did-finish-load', () => {
      creatingProjctModal.loadFile(
        path.join(__dirname, '/renderer/pages/creatingProject.html')
      )
      creatingProjctModal.webContents.once('did-finish-load', async () => {
        const projects = DBCStore.get('projects')
        if (projects && projects.working) {
          if (!(await pathExists(projects.working.path))) {
            delete projects.working
            DBCStore.set('projects', projects)
            loadWindow.close()
            startWindow.show()
          } else {
            projectPanelWindow.loadFile(
              path.join(__dirname, '/renderer/pages/projectPanel.html')
            )
            projectPanelWindow.webContents.once('did-finish-load', () => {
              setTimeout(() => {
                loadWindow.close()
                projectPanelWindow.show()
              }, 1000)
            })
          }
        } else {
          loadWindow.close()
          startWindow.show()
        }
      })
    })
  })
  ipcMain.on('start-window-hide', () => startWindow.hide())
  ipcMain.on('load-window-close', () => loadWindow.close())
  ipcMain.on('project-panel-window-show', () => {
    projectPanelWindow.loadFile(
      path.join(__dirname, '/renderer/pages/projectPanel.html')
    )
    projectPanelWindow.webContents.once('did-finish-load', () => {
      setTimeout(() => projectPanelWindow.show(), 1000)
    })
  })
  ipcMain.on('project-panel-window-close', () => {
    projectPanelWindow.close()
  })
  ipcMain.on('creating-project-modal-show', () => creatingProjctModal.show())
  ipcMain.on('creating-project-modal-hide', () => creatingProjctModal.hide())
  ipcMain.on('creating-project-modal-reload', () =>
    creatingProjctModal.reload()
  )
  ipcMain.handle('get-app-path', () => {
    return app.getAppPath()
  })
  ipcMain.handle(
    'open-directory-dialog-with-creating-project-modal',
    async () => {
      return await dialog.showOpenDialog(creatingProjctModal, {
        properties: ['openDirectory']
      })
    }
  )
  ipcMain.handle('show-notification', (_, options) =>
    new Notification(options).show()
  )
  ipcMain.handle('store-get', (_, key) => {
    return DBCStore.get(key)
  })
  ipcMain.on('store-set', (_, key, value) => DBCStore.set(key, value))
})
