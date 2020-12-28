const { ipcRenderer } = require('electron')
const { join } = require('path')
const { homedir } = require('os')
const { pathExists, readFile } = require('fs-extra')

async function global () {
  async function setupEnv () {
    const appPath = await ipcRenderer.invoke('get-app-path')
    const nodePath = join(homedir(), '.dbc', 'node')

    window.env = {
      appPath,
      rendererPath: (await pathExists(appPath + '/src'))
        ? join(appPath, 'src', 'renderer')
        : join(appPath, 'build', 'renderer'),
      node:
        process.platform === 'win32'
          ? join(nodePath, 'node.exe')
          : join(nodePath, 'bin', 'node'),
      npm:
        process.platform === 'win32'
          ? join(nodePath, 'npm.cmd')
          : join(nodePath, 'bin', 'npm')
    }
  }

  async function setupIcons () {
    for (const iconElem of document.querySelectorAll('icon')) {
      const svgIcon = await readFile(
        join(
          window.env.appPath,
          'node_modules',
          '@discord-bot-creator',
          'icons',
          iconElem.getAttribute('name') + '.svg'
        ),
        'utf-8'
      )
      iconElem.innerHTML += svgIcon
    }
  }

  function setupRequiredInputs () {
    for (const inputElem of document.querySelectorAll('input[required]')) {
      inputElem.parentElement.firstElementChild.innerHTML +=
        ' <span style="color: var(--red);">*</span>'

      function showRequiredMessageOrNot (inputElem) {
        if (!inputElem.value && !inputElem.nextElementSibling) {
          const spanRequiredMessageElem = document.createElement('span')
          spanRequiredMessageElem.innerText = 'Please fill out this field.'
          inputElem.parentElement.appendChild(spanRequiredMessageElem)
        } else if (inputElem.value && inputElem.nextElementSibling) {
          inputElem.nextElementSibling.remove()
        }
      }

      inputElem.addEventListener('focus', () =>
        showRequiredMessageOrNot(inputElem)
      )
      inputElem.addEventListener('change', () =>
        showRequiredMessageOrNot(inputElem)
      )

      const checkIfFillElem = document.querySelector(
        inputElem.getAttribute('check-if-fill')
      )
      if (checkIfFillElem) {
        checkIfFillElem.addEventListener('click', () =>
          showRequiredMessageOrNot(inputElem)
        )
      }
    }
  }

  await setupEnv()
  await setupIcons()
  setupRequiredInputs()
}

global()
