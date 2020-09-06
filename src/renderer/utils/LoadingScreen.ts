import loader2 from '../assets/img/loader2.svg';

export default class LoadingScreen {
  private _message: string;

  constructor(message: string) {
    if (
      document.getElementById('loading-screen')
    ) return;

    this._message = message;

    const loadingScreenElem = document.createElement('div');
    loadingScreenElem.id = 'loading-screen';
    loadingScreenElem.classList.add('fadeIn-500');
    loadingScreenElem.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
    loadingScreenElem.innerHTML = `
      <img 
        id="loading-screen-loader" 
        src="${loader2}" 
        style="width: 100px; height: 100px;"
      >
      <span 
        id="loading-screen-message" 
        style="margin-top: 5px; font-size: 14px; color: #dddddd;"
      >
        ${message}
      </span>
    `;

    document.content.classList.add('fadeOut-500');

    setTimeout(() => {
      document.content.style.display = 'none';
      document.content.classList.remove('fadeOut-500');
      document.overlays.appendChild(loadingScreenElem);

      setTimeout(() => {
        loadingScreenElem.classList.remove('fadeIn-500');
      }, 500);
    }, 500);
  }

  get message() {
    return this._message;
  }

  set message(value: string) {
    const loadingScreenMessageElem = document
      .getElementById('loading-screen-message');
    
    loadingScreenMessageElem.classList.add('fadeOut-200');

    setTimeout(() => {
      loadingScreenMessageElem.innerText = value;
      loadingScreenMessageElem.classList.remove('fadeOut-200');
      loadingScreenMessageElem.classList.add('fadeIn-200');

      setTimeout(() => {
        loadingScreenMessageElem.classList.remove('fadeIn-200');
      }, 200);
    }, 200);
  }

  close() {
    const loadingScreenElem = document
      .getElementById('loading-screen');

    loadingScreenElem.classList.add('fadeOut-500');

    setTimeout(() => {
      loadingScreenElem.remove();

      document.content.classList.add('fadeIn-500');
      document.content.style.display = '';

      setTimeout(() => {
        document.content.classList.remove('fadeIn-500');
      }, 500);
    }, 500);
  }
}
