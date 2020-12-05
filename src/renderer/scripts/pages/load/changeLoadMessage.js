export default function changeLoadMessage (message, size) {
  const messageElem = document.querySelector('p')
  messageElem.innerText = message
  messageElem.style.fontSize = size ? size + 'px' : '15px'
}
