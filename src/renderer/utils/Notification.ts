import { ipcRenderer } from 'electron'
import { readFileSync } from 'fs'

import DBCNotification from '../../interfaces/DBCNotification'

export default class Notification {
  static create (
    type: 'info' | 'success' | 'error' | 'alert',
    message: string,
    timeout?: number
  ): Promise<void> {
    return new Promise(async (resolve) => {
      if (!document.getElementById('notification')) {
        const notifications: Array<DBCNotification> =
          await window.DBC.store.get('notifications') || []
        notifications.push({
          type,
          message
        })
        window.DBC.store.set('notifications', notifications)

        if (await ipcRenderer.invoke('main-window-is-focused')) {
          const notificationCloseSVG = readFileSync(
            window.DBC.env.DBC_APP_PATH +
              '/node_modules/@discord-bot-creator/icons/close.svg',
            'utf-8'
          )
          const notificationElem = document.createElement('div')
          notificationElem.id = 'notification'
          notificationElem.classList.add('fadeInRight-500')
          notificationElem.style.borderColor =
            type === 'info'
              ? 'var(--notificationInfoColor)'
              : type === 'success'
              ? 'var(--notificationsSuccessColor)'
              : type === 'error'
              ? 'var(--notificationErrorColor)'
              : type === 'alert'
              ? 'var(--notificationAlertColor)'
              : ''
          notificationElem.innerHTML = `
            <span>${message}</span>
            <div>${notificationCloseSVG}</div>
          `

          const notificationSoundElem = document.createElement('audio')
          notificationSoundElem.src = '/static/media/audios/notification.mp3'
          notificationSoundElem.autoplay = true

          notificationElem
            .querySelector('div')
            .addEventListener('click', () => this.close())
          notificationSoundElem.addEventListener('ended', () =>
            notificationSoundElem.remove()
          )

          document.body.appendChild(notificationSoundElem)
          document.overlays.appendChild(notificationElem)

          if (timeout) setTimeout(() => this.close(), timeout)

          resolve()
        } else {
          await ipcRenderer.invoke('show-notification', {
            icon: window.DBC.env.DBC_STATIC_PATH + '/media/img/logo.png',
            title: 'Discord Bot Creator',
            body: message
          })
          resolve()
        }
      }
    })
  }

  static close (): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('notification')) {
        const notificationElem = document.getElementById('notification')
        notificationElem.classList.remove('fadeInRight-500')
        notificationElem.classList.add('fadeOutRight-500')
        notificationElem.addEventListener('animationend', () => {
          notificationElem.remove()
          resolve()
        })
      }
    })
  }
}
