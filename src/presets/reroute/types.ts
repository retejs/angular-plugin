import { BaseSchemes, ConnectionId } from 'rete'
import { RenderData } from 'rete-area-plugin'

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

export type PinsData = {
  element: HTMLElement
  type: 'reroute-pins'
  data: PinData
}

export type PinsRender<Schemes extends BaseSchemes> =
  | { type: 'render', data: RenderData<Schemes> | PinsData }
  | { type: 'rendered', data: RenderData<Schemes> | PinsData }
