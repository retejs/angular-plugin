import { Position } from '../types'

type Translate = (dx: number, dy: number) => void
type StartEvent = { pageX: number, pageY: number }

export function useDrag(translate: Translate, getPointer: (e: StartEvent) => Position) {
  return {
    start(e: StartEvent) {
      let previous = { ...getPointer(e) }

      function move(moveEvent: MouseEvent) {
        const current = { ...getPointer(moveEvent) }
        const dx = current.x - previous.x
        const dy = current.y - previous.y

        previous = current

        translate(dx, dy)
      }
      function up() {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
      }

      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
    }
  }
}
