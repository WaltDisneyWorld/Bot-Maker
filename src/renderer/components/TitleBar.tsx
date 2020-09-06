import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as BellSVG } from '@discord-bot-creator/icons/bell.svg';
import { ReactComponent as CogSVG } from '@discord-bot-creator/icons/cog.svg';
import { ReactComponent as WinMinimizeSVG } from '@discord-bot-creator/icons/win-minimize.svg';
import { ReactComponent as WinMaximizeSVG } from '@discord-bot-creator/icons/win-maximize.svg';
import { ReactComponent as WinUnmaximizeSVG } from '@discord-bot-creator/icons/win-unmaximize.svg';
import { ReactComponent as WinCloseSVG } from '@discord-bot-creator/icons/win-close.svg';

import logo from '../assets/img/logo.png';

const TitleBarContainer = styled.div`
  -webkit-app-region: drag;
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--background);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  > div:nth-child(1) {
    -webkit-app-region: no-drag;
    width: 100%;
    height: 5px;
    position: absolute;
    top: 0;
  }

  > div:nth-child(2) {
    -webkit-app-region: no-drag;
    width: 5px;
    height: 30px;
    position: absolute;
  }

  > div:nth-child(3) {
    -webkit-app-region: no-drag;
    width: 5px;
    height: 30px;
    position: absolute;
    right: 1px;
  }

  > div:nth-child(4) {
    -webkit-app-region: no-drag;
    margin-left: 12px;
    display: flex;
    flex-direction: row;
  }

  > div:nth-child(4) div {
    cursor: pointer;
    margin-right: 12px;
    padding: 5px;
    border-radius: 100%;
  }

  > div:nth-child(4) div:nth-child(1) {
    background-color: #f45c5b;
    border: 2px solid #c95c5b;
  }

  > div:nth-child(4) div:nth-child(1):hover {
    background-color: #c95c5b;
  }

  > div:nth-child(4) div:nth-child(2) {
    background-color: #f7bd38;
    border: 2px solid #ddb14d;
  }

  > div:nth-child(4) div:nth-child(2):hover {
    background-color: #ddb14d;
  }

  > div:nth-child(4) div:nth-child(3) {
    background-color: #44cc44;
    border: 2px solid #40b841;
  }

  > div:nth-child(4) div:nth-child(3):hover {
    background-color: #40b841;
  }

  > img {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 10px;
  }

  > div:nth-child(6) {
    max-width: 30%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 11px;
  }

  > div:nth-child(7) {
    -webkit-app-region: no-drag;
    width: 58px;
    height: 32px;
    position: absolute;
    top: 9.5px;
    right: 140px;
    display: flex;
    flex-direction: row;
  }

  > div:nth-child(7) svg {
    cursor: pointer;
    width: 12px;
    height: 12px;
    margin-right: 13px;
  }

  > div:nth-child(7) svg:hover {
    fill: var(--purple);
  }

  > div:nth-child(8) {
    -webkit-app-region: no-drag;
    position: absolute;
    top: -1px;
    right: 0;
    display: flex;
    flex-direction: row;
    font-size: 10px;
  }

  > div:nth-child(8) div {
    cursor: pointer;
    width: 48px;
    height: 31px;
    padding: 8px;
    display: flex;
    justify-content: center;
  }

  > div:nth-child(8) div:hover {
    background-color: var(--titleBarWinMinMaxUnMaxButton);
  }

  > div:nth-child(8) div:nth-child(3):hover {
    background-color: #e81123;
  }
`;

export default function TitleBar() {
  const [winIsMaximized, setWinIsMaximized] = useState(
    window.mainWindow.isMaximized()
  );

  useEffect(() => {
    window.mainWindow.on(
      'maximize', 
      () => setWinIsMaximized(true)
    );
    window.mainWindow.on(
      'unmaximize', 
      () => setWinIsMaximized(false)
    );
  })

  return (
    <TitleBarContainer id="title-bar">
      <div></div>
      <div></div>
      <div></div>
      <div style={process.platform !== 'darwin' ? { display: 'none' } : {}}>
        <div onClick={() => window.mainWindow.close()}></div>
        <div onClick={() => window.mainWindow.minimize()}></div>
        <div onClick={() => {
          if (window.mainWindow.isMaximized()) {
            window.mainWindow.unmaximize();
          } else {
            window.mainWindow.maximize();
          }
        }}></div>
      </div>
      <img 
        src={logo} 
        alt="DBC Logo"
        style={process.platform === 'darwin' ? { left: 'unset', right: '12px' } : {}}
      />
      <div>Discord Bot Creator</div>
      <div style={process.platform === 'darwin' ? { left: '100px' } : {}}>
        <BellSVG title="Notifications" />
        <CogSVG title="Settings" />
      </div>
      <div style={process.platform === 'darwin' ? { display: 'none' } : {}}>
        <div onClick={() => window.mainWindow.minimize()}>
          <WinMinimizeSVG />
        </div>
        <div onClick={() => {
          if (window.mainWindow.isMaximized()) {
            window.mainWindow.unmaximize();
          } else {
            window.mainWindow.maximize();
          }
        }}>
          {winIsMaximized ? <WinUnmaximizeSVG /> : <WinMaximizeSVG />}
        </div>
        <div onClick={() => window.mainWindow.close()}>
          <WinCloseSVG />
        </div>
      </div>
    </TitleBarContainer>
  );
}
