import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../components/Button';

export default class Dialog {
  constructor(
    title: string,
    content: string, 
    type?: 'form'
  ) {
    if (document.getElementById('dialog')) return;

    const dialogElem = document.createElement('div');
    dialogElem.id = 'dialog';
    dialogElem.classList.add('fadeIn-500');
    dialogElem.innerHTML = `
      <div>
        <h2>${title}</h2>
        <div>
          ${content}
        </div>
      </div>
      <div>
      </div>
    `;

    document.overlays.appendChild(dialogElem);
    document.content.style.filter = 'blur(5px)';
    document.content.style.pointerEvents = 'none';
    document.content.style.userSelect = 'none';
    
    ReactDOM.render(
      <Button onClick={() => {
        dialogElem.classList.remove('fadeIn-500');
        dialogElem.classList.add('fadeOut-200');
        dialogElem.addEventListener('animationend', () => {
          document.getElementById('dialog').remove();
          document.content.style.filter = '';
          document.content.style.pointerEvents = '';
          document.content.style.userSelect = '';
        });
      }}>Ok</Button>, 
      document.querySelector('#dialog > div:nth-child(2)')
    );
  }
}
