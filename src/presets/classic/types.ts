import { NodeId, ClassicPreset as Classic, GetSchemes } from 'rete'
import { RenderData } from 'rete-area-plugin'

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
  ? I
  : never
type GetControls<
  T extends ClassicScheme['Node'],
  Intersection = UnionToIntersection<T['controls']>
> = Intersection[keyof Intersection] extends Classic.Control ? Intersection[keyof Intersection] : Classic.Control
type GetSockets<
  T extends ClassicScheme['Node'],
  Intersection = UnionToIntersection<T['inputs'] | T['outputs']>,
  Union = Exclude<Intersection[keyof Intersection], undefined>
> = Union extends { socket: any } ? Union['socket'] : Classic.Socket



export type Side = 'input' | 'output'
export type AngularRenderData<T extends ClassicScheme> =
  | {
    element: HTMLElement,
    type: 'socket',
    payload: GetSockets<T['Node']>
    nodeId: NodeId
    side: Side
    key: string
  }
  | {
    element: HTMLElement,
    type: 'control',
    payload: GetControls<T['Node']>
  }

export type RenderPayload<T extends ClassicScheme> = RenderData<T> | AngularRenderData<T>
export type ExtractPayload<T extends ClassicScheme, K extends string> = Extract<RenderPayload<T>, { type: K }>
export type AngularArea2D<T extends ClassicScheme> =
  | { type: 'render', data: RenderPayload<T> }
  | { type: 'rendered', data: RenderPayload<T> }

export type ClassicScheme = GetSchemes<Classic.Node, Classic.Connection<Classic.Node, Classic.Node> & { isLoop?: boolean }>
