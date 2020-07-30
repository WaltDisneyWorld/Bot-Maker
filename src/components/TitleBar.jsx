import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCog,
  faWindowMinimize, 
  faWindowMaximize, 
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/img/logo.png';

const TitleBarStyle = createGlobalStyle`
  #title-bar {
    -webkit-app-region: drag;
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--background);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  #title-bar-draggable-top {
    -webkit-app-region: no-drag;
    width: 100%;
    height: 5px;
    position: absolute;
    top: 0;
  }

  #title-bar-draggable-left {
    -webkit-app-region: no-drag;
    width: 5px;
    height: 30px;
    position: absolute;
  }

  #title-bar-draggable-right {
    -webkit-app-region: no-drag;
    width: 5px;
    height: 30px;
    position: absolute;
    right: 1px;
  }

  #title-bar img {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }

  #title-bar-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 12px;
  }

  #title-bar-buttons {
    -webkit-app-region: no-drag;
    position: absolute;
    top: -1px;
    right: 95px;
    display: flex;
    flex-direction: row;
    font-size: 13px;
  }

  #title-bar-buttons div {
    cursor: pointer;
    height: 35px;
    padding: 8px;
  }

  #title-bar-buttons div:hover {
    color: var(--purple);
  }

  #title-bar-buttons-2 {
    -webkit-app-region: no-drag;
    position: absolute;
    top: 1px;
    right: 6px;
    display: flex;
    flex-direction: row;
    font-size: 10px;
  }

  #title-bar-buttons-2 div {
    cursor: pointer;
    height: 35px;
    padding: 8px;
  }

  #title-bar-buttons-2 div:hover {
    color: var(--purple);
  }
`;

export default function TitleBar() {
  return (
    <>
      <TitleBarStyle />
      <div id="title-bar">
        <div id="title-bar-draggable-top"></div>
        <div id="title-bar-draggable-left"></div>
        <div id="title-bar-draggable-right"></div>
        <img 
          src={logo} 
          alt="DBC Logo" 
        />
        <span id="title-bar-title">
          Discord Bot Creator
        </span>
        <div id="title-bar-buttons">
          <div 
            data-tip 
            data-for="title-bar-notifications"
          >
            <FontAwesomeIcon icon={faBell} />
          </div>
          <ReactTooltip 
            id="title-bar-notifications"
            effect="solid"
            backgroundColor="var(--gray)"
          >
            Notifications
          </ReactTooltip>
          <div 
            data-tip 
            data-for="title-bar-settings"
          >
            <FontAwesomeIcon icon={faCog} />
          </div>
          <ReactTooltip 
            id="title-bar-settings"
            effect="solid"
            backgroundColor="var(--gray)"
          >
            Settings
          </ReactTooltip>
        </div>
        <div id="title-bar-buttons-2">
          <div onClick={() => window.mainWindow.minimize()}>
            <FontAwesomeIcon icon={faWindowMinimize} />
          </div>
          <div onClick={() => {
            if (!window.mainWindow.isMaximized()) {
              window.mainWindow.maximize();
            } else {
              window.mainWindow.unmaximize();
            }
          }}>
            <FontAwesomeIcon icon={faWindowMaximize} />
          </div>
          <div onClick={() => window.mainWindow.close()}>
            <FontAwesomeIcon icon={faTimes}/>
          </div>
        </div>
      </div>
    </>
  );
}
