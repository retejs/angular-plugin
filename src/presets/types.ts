import { BaseSchemes } from 'rete'
import { AngularRenderPlugin } from '../core'

export type RenderPreset<Schemes extends BaseSchemes, T> = {
  attach?: (plugin: AngularRenderPlugin<Schemes, T>) => void
  update: (context: Extract<T, { type: 'render' }>, plugin: AngularRenderPlugin<Schemes, T>) => Record<string, unknown> | undefined | null | void
  mount: (context: Extract<T, { type: 'render' }>, plugin: AngularRenderPlugin<Schemes, T>) => { key: string, component: any, props: Record<string, unknown> } | undefined | null | void
}
