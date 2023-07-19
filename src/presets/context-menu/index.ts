import { BaseSchemes } from 'rete';

import { ContextMenuRender } from './types';
import { ContextMenuComponent } from './components/menu/menu.component';
import { RenderPreset } from '../types';

/**
 * Preset for rendering context menu.
 */
export function setup<Schemes extends BaseSchemes, K extends ContextMenuRender>(props?: { delay?: number }): RenderPreset<Schemes, K> {
  const delay = typeof props?.delay === 'undefined' ? 1000 : props.delay

  return {
    update(context) {
      if (context.data.type === 'contextmenu') {
        return {
          items: context.data.items,
          delay,
          searchBar: context.data.searchBar,
          onHide: context.data.onHide
        }
      }
    },
    mount(context, plugin) {
      const parent = plugin.parentScope()
      const emit = parent.emit.bind(parent)
      const rendered = () => {
        emit({ type: 'rendered', data: context.data } as any)
      }

      if (context.data.type === 'contextmenu') {
        return {
          key: 'context-menu',
          component: ContextMenuComponent,
          props: {
            items: context.data.items,
            delay,
            searchBar: context.data.searchBar,
            onHide: context.data.onHide,
            rendered
          }
        }
      }
      return null
    }
  }
}
