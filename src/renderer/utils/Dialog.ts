export default class Dialog {
  static create (title: string, content: string): Promise<void> {
    return new Promise((resolve) => {
      if (!document.getElementById('dialog')) {
        const dialogElem = document.createElement('div')
        dialogElem.id = 'dialog'
        dialogElem.classList.add('fadeIn-200')
        dialogElem.innerHTML = `
          <div>
            <h2>${title}</h2>
            <div>
              ${content}
            </div>
          </div>
          <div>
            <button>Ok</button>
          </div>
        `

        document.overlays.appendChild(dialogElem)
        document.content.style.opacity = '0.3'
        document.content.style.userSelect = 'none'
        document.content.style.pointerEvents = 'none'

        dialogElem
          .querySelector('button')
          .addEventListener('click', () => this.close())
        window.addEventListener('keydown', ({ key }) => {
          if (key === 'Enter') this.close()
        })
      }
    })
  }

  static close (): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('dialog')) {
        const dialogElem = document.getElementById('dialog')
        dialogElem.remove()
        document.content.style.opacity = ''
        document.content.style.userSelect = ''
        document.content.style.pointerEvents = ''
        resolve()
      }
    })
  }
}
