/**
 * Copyright (c) Discord Bot Creator.
 * 
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @license
 */

import React, { StrictMode } from 'react';
import { BrowserWindow } from 'electron';
import Store from 'electron-store';
import ReactDOM from 'react-dom';

import GlobalStyle from './components/GlobalStyle';
import TitleBar from './components/TitleBar';

import Routes from './Routes';

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

  interface Document {
    setTitle(value: string): void;
    overlays: HTMLDivElement;
    content: HTMLDivElement;
  }
}

ReactDOM.render(
  <TitleBar />,
  document.getElementById('overlays')
);
ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <Routes />
  </StrictMode>,
  document.getElementById('content')
);
