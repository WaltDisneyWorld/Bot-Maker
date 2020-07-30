/**
 * Copyright (c) Discord Bot Creator.
 * 
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @license
 */

const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');

const DBCServeURL = serve({
  scheme: 'dbc', 
  directory: __dirname 
});

function DBCIsProd() {
  const folderName = __dirname
    .replace(/\\/g, '/')
    .split('/')
    .slice(-1)
    .join('');

  if (folderName === 'public') return false;
  else return true;
}

(async () => {
  await app.whenReady();

  const loadWindow = new BrowserWindow({
    show: false,
    center: true,
    frame: false,
    resizable: false,
    icon: __dirname + '/assets/img/logo.png',
    title: 'Loading | Discord Bot Creator',
    width: 250,
    height: 250,
    backgroundColor: '#282a36'
  });

  loadWindow.removeMenu();
  loadWindow.loadFile(__dirname + '/views/load/index.html');

  loadWindow.webContents
    .once('did-finish-load', async () => {
      loadWindow.show();

      const mainWindow = new BrowserWindow({
        show: false,
        center: true,
        frame: false,
        icon: __dirname + '/assets/img/logo.png',
        title: 'Discord Bot Creator',
        width: 800,
        height: 550,
        minWidth: 800,
        minHeight: 550,
        backgroundColor: '#282a36',
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
      });
    
      if (!DBCIsProd()) {
        mainWindow.loadURL('http://localhost:3000');
      } else {
        mainWindow.removeMenu();
        await DBCServeURL(mainWindow);
        mainWindow.loadURL('dbc://index.html');
      }

      mainWindow.webContents
        .once('did-finish-load', () => {
          loadWindow.close();
          mainWindow.webContents.zoomFactor = 1;
          mainWindow.show();
        });
    });
})();
