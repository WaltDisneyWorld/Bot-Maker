const { join } = require('path')
const childProcess = require('child_process')

export default function menu () {
  const projectAvatarElem = document.querySelector(
    'menu > div:nth-child(1) img'
  )
  const projectControlElem = document.querySelector(
    'menu > div:nth-child(1) div'
  )
  const projectInfoElem = document.querySelector('menu > div:nth-child(1)')

  projectAvatarElem.src = window.bot.storage.config.avatar
  projectAvatarElem.title = `Name: ${window.project.name}\nDescription: ${window.bot.storage.config.description}`
  projectAvatarElem.onerror = () => {
    projectAvatarElem.src = 'https://i.imgur.com/3RzaW3Q.png'
  }
  projectAvatarElem.onclick = () => {
    if (projectAvatarElem.style.border) return

    projectControlElem.classList.add('fadeInRight-200')
    projectAvatarElem.style.border =
      '3px solid var(--projectPanelMenuProjectAvatarBorderColor)'
    projectControlElem.style.display = 'flex'

    document.onclick = (event) => {
      if (
        event.target.getAttribute('name') !== 'project-control' &&
        event.target.getAttribute('name') !== 'project-avatar'
      ) {
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
    if (window.bot.status !== 'online') {
      projectInfoElem.style.borderColor =
        'var(--projectPanelMenuProjectInfoStartingBorderColor)'
      projectControlElem.style.borderColor =
        'var(--projectPanelMenuProjectInfoStartingBorderColor)'
      window.bot.process = childProcess.spawn(
        window.env.node,
        [join(window.project.path, 'bot.js')],
        {
          cwd: window.project.path
        }
      )
      window.bot.process.stdout.on('data', (data) => {
        data = String(data)
        if (data.includes('Bot started')) {
          window.bot.status = 'online'
          projectInfoElem.style.borderColor =
            'var(--projectPanelMenuProjectInfoOnlineBorderColor)'
          projectControlElem.style.borderColor =
            'var(--projectPanelMenuProjectInfoOnlineBorderColor)'
        }
      })
    }
  }

  projectControlElem.querySelectorAll('button')[1].onclick = () => {
    if (window.bot.status === 'online') {
      window.bot.process.stdout.pause()
      window.bot.process.kill()
      window.bot.status = 'offline'
      projectInfoElem.style.borderColor =
        'var(--projectPanelMenuProjectInfoOfflineBorderColor)'
      projectControlElem.style.borderColor =
        'var(--projectPanelMenuProjectInfoOfflineBorderColor)'
    }
  }

  document.body.onbeforeunload = () => {
    if (window.bot.process) {
      window.bot.process.stdout.pause()
      window.bot.process.kill()
    }
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
}
