import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import styled from 'styled-components'
import { ReactComponent as BellSVG } from '@discord-bot-creator/icons/bell.svg'
import { ReactComponent as CogSVG } from '@discord-bot-creator/icons/cog.svg'
import { ReactComponent as MinimizeSVG } from '@discord-bot-creator/icons/minimize.svg'
import { ReactComponent as MaximizeSVG } from '@discord-bot-creator/icons/maximize.svg'
import { ReactComponent as UnmaximizeSVG } from '@discord-bot-creator/icons/unmaximize.svg'
import { ReactComponent as CloseSVG } from '@discord-bot-creator/icons/close.svg'

import logo from '../assets/img/logo.png'

const TitleBarContainer = styled.div`
  -webkit-app-region: drag;
  user-select: none;
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--background);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

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
    ${process.platform === 'darwin' ? 'display: flex' : 'display: none'};
    flex-direction: row;
  }

  > div:nth-child(4) div {
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
    ${process.platform === 'darwin' ? 'right: 12px' : 'left: 10px'};
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
    height: 30px;
    position: absolute;
    top: 0.5px;
    ${process.platform === 'darwin' ? 'left: 100px' : 'right: 150px'};
    display: flex;
    flex-direction: row;
  }

  > div:nth-child(7) div {
    cursor: pointer;
    width: 20px;
    margin-right: 5px;
  }

  > div:nth-child(7) svg {
    width: 12px;
    height: 12px;
    margin-top: 9px;
    margin-left: 4px;
    transition: fill 200ms;
  }

  > div:nth-child(7) div:hover > svg {
    fill: var(--main);
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
    width: 48px;
    height: 31px;
    padding: 8px;
    ${process.platform === 'darwin' ? 'display: none' : 'display: flex'};
    justify-content: center;
  }

  > div:nth-child(8) div:hover {
    background-color: var(--titleBarWinMinMaxUnMaxButton);
  }

  > div:nth-child(8) div:nth-child(3):hover {
    background-color: #e81123;
  }
`

export default function TitleBar () {
  const [winIsMaximized, setWinIsMaximized] = useState(false)

  async function handleMaxUnWindow () {
    if (await ipcRenderer.invoke('main-window-is-maximized')) {
      ipcRenderer.send('main-window-unmaximize')
    } else {
      ipcRenderer.send('main-window-maximize')
    }
  }

  useEffect(() => {
    ipcRenderer.on('main-window-maximize', () => setWinIsMaximized(true))
    ipcRenderer.on('main-window-unmaximize', () => setWinIsMaximized(false))
  })

  return (
    <TitleBarContainer id="title-bar">
      <div></div>
      <div></div>
      <div></div>
      <div>
        <div onClick={() => ipcRenderer.send('main-window-close')}></div>
        <div onClick={() => ipcRenderer.send('main-window-minimize')}></div>
        <div onClick={handleMaxUnWindow}></div>
      </div>
      <img src={logo} alt="DBC Logo" />
      <div>Discord Bot Creator</div>
      <div>
        <div title="Notifications">
          <BellSVG />
        </div>
        <div title="Settings">
          <CogSVG />
        </div>
      </div>
      <div>
        <div onClick={() => ipcRenderer.send('main-window-minimize')}>
          <MinimizeSVG />
        </div>
        <div onClick={handleMaxUnWindow}>
          {winIsMaximized ? <UnmaximizeSVG /> : <MaximizeSVG />}
        </div>
        <div onClick={() => ipcRenderer.send('main-window-close')}>
          <CloseSVG />
        </div>
      </div>
    </TitleBarContainer>
  )
}
