import { remote } from 'electron'

const { getCurrentWindow } = remote

window.mainWindow = getCurrentWindow()
