import { ipcRenderer } from 'electron'

window.DBC = {}
window.DBC.mainWindow = {
  minimize () {
    ipcRenderer.send('main-window-minimize')
  },
  maximize () {
    ipcRenderer.send('main-window-maximize')
  },
  unmaximize () {
    ipcRenderer.send('main-window-unmaximize')
  },
  close () {
    ipcRenderer.send('main-window-close')
  },
  async isMaximized (): Promise<Boolean> {
    return await ipcRenderer.invoke('main-window-is-maximized')
  },
  async isFocused (): Promise<Boolean> {
    return await ipcRenderer.invoke('main-window-is-focused')
  }
}
