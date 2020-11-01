import { ipcRenderer } from 'electron'

window.DBC.store = {
  async get (key: string) {
    return await ipcRenderer.invoke('store-get', key)
  },
  set (key: string, value: any) {
    ipcRenderer.send('store-set', key, value)
  }
}
