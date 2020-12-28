/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { app, BrowserWindow, ipcMain, dialog, Notification } from 'electron'
import { join } from 'path'
import * as Store from 'electron-store'
import { pathExists } from 'fs-extra'

import { DBCProjects } from '../interfaces'

app.once('ready', () => {
  const loadWindow = new BrowserWindow({
    show: false,
    center: true,
    frame: false,
    resizable: false,
    icon: join(__dirname, '..', 'resources', 'icon.png'),
    title: 'Discord Bot Creator | Loading',
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
    icon: join(__dirname, '..', 'resources', 'icon.png'),
    title: 'Discord Bot Creator',
    width: 610,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const creatingProjectModal = new BrowserWindow({
    show: false,
    center: true,
    modal: true,
    parent: startWindow,
    autoHideMenuBar: true,
    icon: join(__dirname, '..', 'resources', 'icon.png'),
    title: 'Creating Project',
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
    icon: join(__dirname, '..', 'resources', 'icon.png'),
    title: 'Discord Bot Creator | Project Panel',
    webPreferences: {
      nodeIntegration: true
    }
  })

  const DBCStore = new Store()

  loadWindow.loadFile(join(__dirname, '..', 'renderer', 'pages', 'load.html'))
  loadWindow.webContents.once('did-finish-load', () => loadWindow.show())

  startWindow.on('close', () => {
    creatingProjectModal.destroy()
    projectPanelWindow.destroy()
  })
  creatingProjectModal.on('close', (e) => {
    e.preventDefault()
    creatingProjectModal.hide()
  })
  projectPanelWindow.on('close', () => {
    startWindow.destroy()
    creatingProjectModal.destroy()
  })

  ipcMain.once('dbc-loaded', async () => {
    startWindow.loadFile(join(__dirname, '..', 'renderer', 'pages', 'start.html'))
    startWindow.webContents.once('did-finish-load', () => {
      creatingProjectModal.loadFile(
        join(__dirname, '..', 'renderer', 'pages', 'creatingProject.html')
      )
      creatingProjectModal.webContents.once('did-finish-load', async () => {
        const projects = DBCStore.get<any, DBCProjects>('projects')

        if (projects && projects.working) {
          if (!(await pathExists(projects.working.path))) {
            delete projects.working
            DBCStore.set('projects', projects)

            loadWindow.close()
            startWindow.show()
          } else {
            projectPanelWindow.loadFile(
              join(__dirname, '..', 'renderer', 'pages', 'projectPanel.html')
            )
            projectPanelWindow.webContents.once('did-finish-load', () => {
              loadWindow.close()
              projectPanelWindow.show()
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
      join(__dirname, '..', 'renderer', 'pages', 'projectPanel.html')
    )
    projectPanelWindow.webContents.once('did-finish-load', () =>
      projectPanelWindow.show()
    )
  })
  ipcMain.on('project-panel-window-close', () => {
    projectPanelWindow.close()
  })
  ipcMain.on('creating-project-modal-show', () => creatingProjectModal.show())
  ipcMain.on('creating-project-modal-hide', () => creatingProjectModal.hide())
  ipcMain.on('creating-project-modal-reload', () =>
    creatingProjectModal.reload()
  )
  ipcMain.handle('get-app-path', () => {
    return app.getAppPath()
  })
  ipcMain.handle(
    'open-directory-dialog-with-creating-project-modal',
    async () => {
      return await dialog.showOpenDialog(creatingProjectModal, {
        properties: ['openDirectory']
      })
    }
  )
  ipcMain.on('create-modal', (_, title, content) => {
    const modal = new BrowserWindow({
      center: true,
      autoHideMenuBar: true,
      icon: join(__dirname, '..', 'resources', 'icon.png'),
      title,
      webPreferences: {
        nodeIntegration: true
      }
    })
    modal.loadFile(join(__dirname, '..', 'renderer', 'views', 'modal.html'))
    modal.webContents.once('did-finish-load', () => {
      modal.webContents.send('update-modal', title, content)
    })
  })
  ipcMain.handle('show-notification', (_, options) =>
    new Notification(options).show()
  )
  ipcMain.handle('store-get', (_, key) => {
    return DBCStore.get(key)
  })
  ipcMain.on('store-set', (_, key, value) => DBCStore.set(key, value))
})
