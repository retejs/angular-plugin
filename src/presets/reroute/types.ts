import { ConnectionId } from 'rete'
import { RenderSignal } from '../../types'

export type Position = {
  x: number
  y: number
}
export type Pin = {
  id: string
  position: Position
  selected?: boolean
}
export type PinData = {
  id: ConnectionId
  pins: Pin[]
}

export type PinsRender =
  | RenderSignal<'reroute-pins', { data: PinData }>
