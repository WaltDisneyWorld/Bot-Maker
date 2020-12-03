/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import verifyDBCNode from './verifyDBCNode.js'

const { ipcRenderer } = require('electron')

async function load () {
  await verifyDBCNode('14.15.0')
  ipcRenderer.send('dbc-loaded')
}

load()
