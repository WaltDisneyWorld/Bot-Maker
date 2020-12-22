/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { ipcRenderer } = require('electron')

document.querySelectorAll('button')[0].onclick = () => {
  ipcRenderer.send('creating-project-modal-show')
}
