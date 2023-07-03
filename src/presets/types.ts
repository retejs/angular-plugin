import { BaseSchemes } from 'rete'
import { AngularPlugin } from '../core'

export type RenderPreset<Schemes extends BaseSchemes, T> = {
  attach?: (plugin: AngularPlugin<Schemes, T>) => void
  update: (context: Extract<T, { type: 'render' }>, plugin: AngularPlugin<Schemes, T>) => Record<string, unknown> | undefined | null | void
  mount: (context: Extract<T, { type: 'render' }>, plugin: AngularPlugin<Schemes, T>) => { key: string, component: any, props: Record<string, unknown> } | undefined | null | void
}
