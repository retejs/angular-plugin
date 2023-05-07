import { NodeId, ClassicPreset as Classic, GetSchemes } from 'rete'
import { Position, RenderSignal } from '../../types'

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

export type ExtractPayload<T extends ClassicScheme, K extends string> = Extract<AngularArea2D<T>, { type: 'render', data: { type: K } }>['data']
export type AngularArea2D<T extends ClassicScheme> =
  | RenderSignal<'node', { payload: T['Node'] }>
  | RenderSignal<'connection', { payload: T['Connection'], start?: Position, end?: Position }>
  | RenderSignal<'socket', {
    payload: GetSockets<T['Node']>
    nodeId: NodeId
    side: Side
    key: string
  }>
  | RenderSignal<'control', {
    payload: GetControls<T['Node']>
  }>
  | { type: 'unmount', data: { element: HTMLElement } }

export type ClassicScheme = GetSchemes<Classic.Node, Classic.Connection<Classic.Node, Classic.Node> & { isLoop?: boolean }>
