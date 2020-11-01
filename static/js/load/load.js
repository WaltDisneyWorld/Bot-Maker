/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import verifyDBCNode from './verifyDBCNode.js'

const { ipcRenderer } = require('electron')

async function load () {
  window.setLoadMessage = (message, size) => {
    const messageElem = document.querySelector('p')
    messageElem.innerText = message
    messageElem.style.fontSize = size ? size + 'px' : '14px'
  }
  verifyDBCNode('12.19.0').then(() => ipcRenderer.send('dbc-load'))
}

load()
