import { BaseSchemes } from 'rete';

import { RenderPreset } from '../types';
import { MinimapRender } from './types';
import { MinimapComponent } from './components/minimap/minimap.component';

export function setup<Schemes extends BaseSchemes, K extends MinimapRender>(props?: { size?: number }): RenderPreset<Schemes, K> {
  return {
    update(context) {
      if (context.data.type === 'minimap') {
        return {
          nodes: context.data.nodes,
          size: props?.size || 200,
          ratio: context.data.ratio,
          viewport: context.data.viewport,
          translate: context.data.translate,
          point: context.data.point
        }
      }
      return null
    },
    mount(context, plugin) {
      const parent = plugin.parentScope()
      const emit = parent.emit.bind(parent)
      const rendered = () => {
        emit({ type: 'rendered', data: context.data } as any)
      }

      if (context.data.type === 'minimap') {
        return {
          key: 'rete-minimap',
          component: MinimapComponent,
          props: {
            nodes: context.data.nodes,
            size: props?.size || 200,
            ratio: context.data.ratio,
            viewport: context.data.viewport,
            translate: context.data.translate,
            point: context.data.point,
            rendered
          }
        }
      }
      return null
    }
  }
}
