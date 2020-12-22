/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import menu from './menu.js'
import config from './config.js'

const { ipcRenderer } = require('electron')
const { readFile } = require('fs-extra')
const { join } = require('path')

async function projectPanel () {
  window.project = (await ipcRenderer.invoke('store-get', 'projects')).working
  window.bot = {
    status: 'offline',
    process: null,
    storage: JSON.parse(
      await readFile(join(window.project.path, 'storage.json'), 'utf-8')
    )
  }

  document.title += ' - ' + window.project.name

  menu()
  config()
}

projectPanel()
