/*!
 * Copyright (c) Discord Bot Creator.
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import config from './config/config.js'

const { ipcRenderer } = require('electron')
const { readFile } = require('fs-extra')
const path = require('path')
const childProcess = require('child_process')

async function projectPanel () {
  const project = (await ipcRenderer.invoke('store-get', 'projects')).working
  const bot = {
    status: 'offline',
    process: null,
    storage: JSON.parse(await readFile(path.join(project.path, 'storage.json'), 'utf-8'))
  }

  document.title += ' - ' + project.name

  const projectAvatarElem = document.querySelector(
    'menu > div:nth-child(1) img'
  )
  const projectControlElem = document.querySelector(
    'menu > div:nth-child(1) div'
  )
  const projectInfoElem = document.querySelector('menu > div:nth-child(1)')

  projectAvatarElem.src = bot.storage.config.avatar
  projectAvatarElem.title = `Name: ${project.name}\nDescription: ${bot.storage.config.description}`
  projectAvatarElem.onerror = () => {
    projectAvatarElem.src = 'https://i.imgur.com/3RzaW3Q.png'
  }
  projectAvatarElem.onclick = () => {
    if (projectAvatarElem.style.border) return

    projectControlElem.classList.add('fadeInRight-200')
    projectAvatarElem.style.border = '3px solid var(--projectPanelMenuProjectAvatarBorderColor)'
    projectControlElem.style.display = 'flex'

    document.onclick = (event) => {
      if (event.target.getAttribute('name') !== 'project-control' && event.target.getAttribute('name') !== 'project-avatar') {
        document.onclick = null
        projectControlElem.classList.remove('fadeInRight-200')
        projectControlElem.classList.add('fadeOutRight-200')
        projectAvatarElem.style.border = ''
        setTimeout(() => {
          projectControlElem.classList.remove('fadeOutRight-200')
          projectControlElem.style.display = 'none'
        }, 100)
      }
    }
  }

  projectControlElem.querySelectorAll('button')[0].onclick = () => {
    if (bot.status !== 'online') {
      bot.process = childProcess.spawn(window.DBC.node, [path.join(project.path, 'bot.js')], {
        cwd: project.path
      })
      bot.process.stdout.on('data', data => {
        if (data.includes('Bot started')) {
          bot.status = 'online'
          projectInfoElem.style.backgroundColor = 'var(--projectPanelMenuProjectInfoOnlineBg)'
          projectControlElem.style.backgroundColor = 'var(--projectPanelMenuProjectInfoOnlineBg)'
        }
      })
    }
  }

  projectControlElem.querySelectorAll('button')[1].onclick = () => {
    if (bot.status === 'online') {
      bot.process.stdout.pause()
      bot.process.kill()
      bot.status = 'offline'
      projectInfoElem.style.backgroundColor = 'var(--projectPanelMenuProjectInfoOfflineBg)'
      projectControlElem.style.backgroundColor = 'var(--projectPanelMenuProjectInfoOfflineBg)'
    }
  }

  document.body.onbeforeunload = () => {
    bot.process.stdout.pause()
    bot.process.kill()
  }

  const sectionsMenuElems = document.querySelectorAll(
    'menu > div:nth-child(2) div'
  )
  for (const sectionMenuElem of sectionsMenuElems) {
    sectionMenuElem.onclick = () => {
      if (sectionMenuElem.style.backgroundColor) return

      for (const sectionMenuElem_ of sectionsMenuElems) {
        if (sectionMenuElem_.style.backgroundColor) {
          sectionMenuElem_.style.backgroundColor = ''
        }
      }

      sectionMenuElem.style.backgroundColor =
        'var(--projectPanelSectionsMenuActiveBg)'

      const sectionElems = document.querySelectorAll('#sections > div')
      for (const sectionElem of sectionElems) {
        if (sectionElem.style.display !== 'none') {
          document.body.style.overflowY = 'hidden'
          sectionElem.classList.add('fadeOutBottom-200')
          setTimeout(() => {
            sectionElem.style.display = 'none'
            document.body.style.overflowY = ''
            sectionElem.classList.remove('fadeOutBottom-200')
          }, 200)
        }
      }

      setTimeout(() => {
        switch (Array.from(sectionsMenuElems).indexOf(sectionMenuElem)) {
          case 0:
            sectionElems[0].style.display = ''
            document.body.style.overflowY = 'hidden'
            sectionElems[0].classList.add('fadeInBottom-200')
            setTimeout(() => {
              sectionElems[0].classList.remove('fadeInBottom-200')
              document.body.style.overflowY = ''
              window.localStorage.setItem('lastSection', 0)
            }, 200)
            break
          case 1:
            sectionElems[1].style.display = ''
            document.body.style.overflowY = 'hidden'
            sectionElems[1].classList.add('fadeInBottom-200')
            setTimeout(() => {
              sectionElems[1].classList.remove('fadeInBottom-200')
              document.body.style.overflowY = ''
              window.localStorage.setItem('lastSection', 1)
            }, 200)
            break
          case 2:
            sectionElems[2].style.display = ''
            document.body.style.overflowY = 'hidden'
            sectionElems[2].classList.add('fadeInBottom-200')
            setTimeout(() => {
              sectionElems[2].classList.remove('fadeInBottom-200')
              document.body.style.overflowY = ''
              window.localStorage.setItem('lastSection', 2)
            }, 200)
            break
        }
      }, 200)
    }
  }

  const lastSection = window.localStorage.getItem('lastSection')
  if (lastSection) sectionsMenuElems[lastSection].click()

  config(bot, project)
}

projectPanel()
