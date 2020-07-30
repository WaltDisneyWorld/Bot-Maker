const _Notification = window.require('electron')
  .remote
  .Notification;

export default class Notification {
  constructor(
    type: 'info' | 'success' | 'error' | 'alert', 
    message: string, 
    timeout?: number
  ) {
    if (
      document.getElementById('notification')
    ) return;

    const notifications = window
      .store
      .get('notifications') || 
      [];
    
    notifications.push({
      type,
      message
    });

    window.store.set(
      'notifications', 
      notifications
    );

    if (window.mainWindow.isFocused()) {
      const notificationElem = document.createElement('div');
      notificationElem.id = 'notification';
      notificationElem.classList.add('fadeInRight-500');
      notificationElem.style.cssText = `
        z-index: 100;
        max-width: 300px;
        position: fixed;
        top: 50px;
        right: 20px;
        display: flex;
        flex-direction: row;
        padding: 12px 15px;
        font-size: 13px;
        border-radius: 3px;
        background-color: #44475a;
        border-bottom: 3px solid ${
          type === 'info' ? 
          '#8be9fd' : 
          type === 'success' ? 
          '#50fa7b' : 
          type === 'error' ? 
          '#ff5555' : 
          '#f1fa8c'
        };
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      `;
      notificationElem.innerHTML = `
        <span id="notification-message">
          ${message}
        </span>
        <div 
          id="notification-close" 
          style="cursor: pointer; margin-left: 10px;"
        >
          <svg
            aria-hidden="true" 
            focusable="false" 
            data-prefix="fas" 
            data-icon="times" 
            class="svg-inline--fa fa-times fa-w-11" 
            role="img" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 352 512"
          >
            <path 
              fill="currentColor" 
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
            </path>
          </svg>
        </div>
      `;

      const notificationSoundElem = document.createElement('audio');
      notificationSoundElem.src = '/assets/audios/notification.mp3';
      notificationSoundElem.autoplay = true;

      document.body.appendChild(notificationSoundElem);
      document.overlays.appendChild(notificationElem);
      
      document.getElementById('notification-close')
        .addEventListener('click', () => {
          notificationElem.classList.remove('fadeInRight-500');
          notificationElem.classList.add('fadeOutRight-500');

          notificationElem.addEventListener('animationend', () => {
            notificationElem.remove();
            notificationSoundElem.remove();
          });
        });

      if (timeout) {
        setTimeout(() => {
          notificationElem.classList.remove('fadeInRight-500');
          notificationElem.classList.add('fadeOutRight-500');
  
          notificationElem.addEventListener('animationend', () => {
            notificationElem.remove();
            notificationSoundElem.remove();
          });
        }, timeout);
      }
    } else {
      new _Notification({
        icon: window.env.DBC_PUBLIC_PATH + '/assets/img/logo.png',
        title: 'Discord Bot Creator',
        body: message,
        sound: window.env.DBC_PUBLIC_PATH + '/assets/audios/effects/notification.mp3',
      }).show();
    }
  }
}
