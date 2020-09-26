import './setTitle'
import './overlays'
import './content'

declare global {
  interface Document {
    setTitle(value: string): void
    overlays: HTMLElement
    content: HTMLElement
  }
}
