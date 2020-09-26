// @ts-ignore

document.setTitle = (value: string) => {
  document.title = value
  document.querySelector<HTMLSpanElement>(
    '#title-bar div:nth-child(6)'
  ).innerText = value
}
