import { BrowserWindow } from 'electron';
import Store from 'electron-store';

import './mainWindow';
import './store';
import './env';

declare global {
  interface Window {
    mainWindow: BrowserWindow;
    store: Store;
    env: {
      DBC_VERSION: string;
      DBC_PUBLIC_PATH: string;
      DBC_HOME_PATH: string;
      DBC_NODE_PATH: string;
      DBC_NPM_PATH: string;
    };
  }
}
