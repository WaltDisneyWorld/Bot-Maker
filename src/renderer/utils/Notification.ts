import { remote } from 'electron'
import { readFileSync } from 'fs'

import DBCNotification from '../../interfaces/DBCNotification'

const ElectronNotification = remote.Notification

const closeSVG = readFileSync(
  window.env.DBC_APP_PATH +
    '/node_modules/@discord-bot-creator/icons/close.svg',
  'utf-8'
)

export default class Notification {
  static create (
    type: 'info' | 'success' | 'error' | 'alert',
    message: string,
    timeout?: number
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!document.getElementById('notification')) {
        const notifications =
          window.store.get<any, Array<DBCNotification>>('notifications') || []

        notifications.push({
          type,
          message
        })

        window.store.set('notifications', notifications)

        if (window.mainWindow.isFocused()) {
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
            <div>${closeSVG}</div>
          `

          const notificationSoundElem = document.createElement('audio')
          notificationSoundElem.src = '/static/media/audios/notification.mp3'
          notificationSoundElem.autoplay = true

          document.body.appendChild(notificationSoundElem)
          document.overlays.appendChild(notificationElem)

          notificationElem.addEventListener('animationend', () => resolve())
          notificationElem
            .querySelector('div')
            .addEventListener('click', () => this.close())
          notificationSoundElem.addEventListener('ended', () =>
            notificationSoundElem.remove()
          )

          if (timeout) setTimeout(() => this.close(), timeout)
        } else {
          new ElectronNotification({
            icon: window.env.DBC_STATIC_PATH + '/media/img/logo.png',
            title: 'Discord Bot Creator',
            body: message
          }).show()
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
