import { readFileSync } from 'fs'

const loaderSVG = readFileSync(
  window.env.DBC_STATIC_PATH + '/media/img/loader.svg',
  'utf-8'
)

export default class LoadingScreen {
  private _message: string

  constructor() {
    this._message = ''
  }

  get message() {
    return this._message
  }

  set message(value: string) {
    if (document.getElementById('loading-screen')) {
      const loadingScreenMessageElem = document.querySelector<HTMLSpanElement>(
        '#loading-screen span'
      )
      loadingScreenMessageElem.classList.add('fadeOut-200')
      setTimeout(() => {
        loadingScreenMessageElem.innerText = value
        loadingScreenMessageElem.classList.remove('fadeOut-200')
        loadingScreenMessageElem.classList.add('fadeIn-200')
        setTimeout(() => {
          loadingScreenMessageElem.classList.remove('fadeIn-200')
        }, 200)
      }, 200)
    }
  }

  create(message: string): Promise<void> {
    return new Promise((resolve) => {
      if (!document.getElementById('loading-screen')) {
        const loadingScreenElem = document.createElement('div')
        loadingScreenElem.id = 'loading-screen'
        loadingScreenElem.classList.add('fadeIn-500')
        loadingScreenElem.innerHTML = `
          ${loaderSVG}
          <span>${message}</span>
        `

        document.content.classList.add('fadeOut-500')
        setTimeout(() => {
          document.content.style.display = 'none'
          document.content.classList.remove('fadeOut-500')
          document.overlays.appendChild(loadingScreenElem)
          setTimeout(() => {
            loadingScreenElem.classList.remove('fadeIn-500')
            resolve()
          }, 500)
        }, 500)
      }
    })
  }

  close(): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('loading-screen')) {
        const loadingScreenElem = document.getElementById('loading-screen')
        loadingScreenElem.classList.add('fadeOut-500')
        setTimeout(() => {
          loadingScreenElem.remove()
          document.content.classList.add('fadeIn-500')
          document.content.style.display = ''
          setTimeout(() => {
            document.content.classList.remove('fadeIn-500')
            resolve()
          }, 500)
        }, 500)
      }
    })
  }
}
