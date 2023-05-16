import { BaseSchemes } from 'rete';
import { BaseAreaPlugin } from 'rete-area-plugin';

import { RenderPreset } from '../types'
import { PinsRender } from './types';
import { PinsComponent } from './components/pins/pins.component';

type Props = {
  translate?: (id: string, dx: number, dy: number) => void
  contextMenu?: (id: string) => void
  pointerdown?: (id: string) => void
}

export function setup<Schemes extends BaseSchemes, K extends PinsRender>(props?: Props): RenderPreset<Schemes, K> {
  const getProps = () => ({
    menu: props?.contextMenu || (() => null),
    translate: props?.translate || (() => null),
    down: props?.pointerdown || (() => null)
  })

  return {
    update(context) {
      if (context.data.type === 'reroute-pins') {
        return {
          ...getProps(),
          pins: context.data.data.pins
        }
      }
      return null
    },
    mount(context, plugin) {
      const area = plugin.parentScope<BaseAreaPlugin<Schemes, PinsRender>>(BaseAreaPlugin)
      const rendered = () => {
        area.emit({ type: 'rendered', data: context.data })
      }

      if (context.data.type === 'reroute-pins') {
        return {
          key: 'rete-reroute',
          component: PinsComponent,
          props: {
            ...getProps(),
            pins: context.data.data.pins,
            rendered,
            getPointer: () => area.area.pointer
          }
        }
      }
      return null
    }
  }
}
