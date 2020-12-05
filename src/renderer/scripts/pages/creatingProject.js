/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { homedir } = require('os')
const { ipcRenderer } = require('electron')
const { pathExists, readFile, mkdir, copy } = require('fs-extra')
const { join } = require('path')
const exec = require('util').promisify(require('child_process').exec)

const projectAvatarElem = document.querySelector('img')
projectAvatarElem.onerror = () => {
  projectAvatarElem.src = 'https://i.imgur.com/3RzaW3Q.png'
}
document.getElementById('project-avatar').onchange = (event) => {
  projectAvatarElem.src = event.target.value
}

document.getElementById('project-path').value = process.platform === 'win32' ? join(homedir(), 'Desktop') : homedir()
document.querySelector('form div:nth-child(5) button').onclick = async (
  event
) => {
  const path = await ipcRenderer.invoke(
    'open-directory-dialog-with-creating-project-modal'
  )
  if (!path.canceled) {
    document.getElementById('project-path').value = path.filePaths[0]
  }
}
document.querySelectorAll('button')[1].onclick = async (event) => {
  event.preventDefault()

  function setTextInputError (selector, message) {
    const textInputErrorElem = document.querySelector(selector)
      .nextElementSibling
    textInputErrorElem.innerText = message
  }

  setTextInputError('#project-avatar', '')
  setTextInputError('#project-name', '')
  setTextInputError('#project-description', '')
  setTextInputError('#project-path', '')

  const projectAvatar = document.getElementById('project-avatar').value
  const projectName = document.getElementById('project-name').value
  const projectDescription = document.getElementById('project-description')
    .value
  const projectPath = document.getElementById('project-path').value
  const realProjectPath = join(projectPath, projectName)

  if (!projectAvatar) {
    setTextInputError('#project-avatar', 'Please fill out this field.')
  } else if (!projectName) {
    setTextInputError('#project-name', 'Please fill out this field.')
  } else if (!projectDescription) {
    setTextInputError('#project-description', 'Please fill out this field.')
  } else if (!projectPath) {
    setTextInputError('#project-path', 'Please fill out this field.')
  } else {
    if (!(await pathExists(projectPath))) {
      setTextInputError('#project-path', 'Invalid path.')
    } else if (await pathExists(realProjectPath)) {
      setTextInputError(
        '#project-name',
        'A directory already exists in the path entered with this name.'
      )
    } else {
      const loadingScreenElem = document.createElement('div')
      loadingScreenElem.id = 'loading-screen'
      loadingScreenElem.classList.add('fadeIn-200')
      loadingScreenElem.innerHTML = `${await readFile(
        window.DBC.rendererPath + '/assets/img/loader.svg',
        'utf-8'
      )}<p>Copying project files<p>`
      const loadingScreenMessageElem = loadingScreenElem.querySelector('p')

      const formElem = document.querySelector('form')
      formElem.style.transition = '200ms'
      formElem.style.opacity = '0.3'
      formElem.style.filter = 'blur(3px)'
      formElem.style.pointerEvents = 'none'
      formElem.style.userSelect = 'none'

      document.body.appendChild(loadingScreenElem)

      setTimeout(async () => {
        await mkdir(realProjectPath)
        await copy(
          window.DBC.appPath + '/node_modules/@discord-bot-creator/bot/bot.js',
          join(realProjectPath, 'bot.js')
        )
        await copy(
          window.DBC.appPath +
            '/node_modules/@discord-bot-creator/bot/storage.json',
          join(realProjectPath, 'storage.json')
        )
        await copy(
          window.DBC.appPath +
            '/node_modules/@discord-bot-creator/bot/package-template.json',
          join(realProjectPath, 'package.json')
        )

        setTimeout(async () => {
          loadingScreenMessageElem.innerText = 'Downloading dependencies'

          await exec(window.DBC.npm + ' i', { cwd: realProjectPath })

          const projects =
            (await ipcRenderer.invoke('store-get', 'projects')) || {}
          projects.working = {
            name: projectName,
            path: realProjectPath
          }
          const otherProjects = projects.others || []
          otherProjects.push({
            name: projectName,
            path: realProjectPath
          })
          projects.others = otherProjects
          ipcRenderer.send('store-set', 'projects', projects)

          ipcRenderer.send('creating-project-modal-hide')
          ipcRenderer.send('creating-project-modal-reload')
          ipcRenderer.send('start-window-hide')
          ipcRenderer.send('project-panel-window-show')
        }, 1000)
      }, 200)
    }
  }
}
