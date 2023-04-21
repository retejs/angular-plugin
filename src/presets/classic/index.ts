import { Type } from '@angular/core';
import { CanAssignSignal, ClassicPreset, getUID } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import { classicConnectionPath, loopConnectionPath, SocketPositionWatcher, useDOMSocketPosition } from 'rete-render-utils';
import { AngularArea2D, ClassicScheme, RenderPayload, ExtractPayload } from './types';
import { NodeComponent } from './components/node/node.component';
import { SocketComponent } from './components/socket/socket.component';
import { ControlComponent } from './components/control/control.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ConnectionWrapperComponent } from './components/connection/connection-wrapper.component';
import { ExtraRender, Position, RenderPreset } from '../../types';

type AngularComponent = Type<any>
type CustomizationProps <Schemes extends ClassicScheme>= {
  node?: (data: ExtractPayload<Schemes, 'node'>) => AngularComponent | null
  connection?: (data: ExtractPayload<Schemes, 'connection'>) => AngularComponent | null
  socket?: (data: ExtractPayload<Schemes, 'socket'>) => AngularComponent | null
  control?: (data: ExtractPayload<Schemes, 'control'>) => AngularComponent | null
}

type IsCompatible<K> = Extract<K, { type: 'render' | 'rendered' }> extends { type: 'render' | 'rendered', data: infer P } ? CanAssignSignal<P, RenderPayload<ClassicScheme>> : false
type Substitute<K, Schemes extends ClassicScheme> = IsCompatible<K> extends true ? K : AngularArea2D<Schemes>

type ClasssicProps<Schemes extends ClassicScheme, K extends ExtraRender> = (
  | { socketPositionWatcher: SocketPositionWatcher }
  | { area: AreaPlugin<Schemes, Substitute<K, Schemes>> }
) & {
  customize?: CustomizationProps<Schemes>
}

export function setup<Schemes extends ClassicScheme, K extends ExtraRender>(
  props: ClasssicProps<Schemes, K>
): RenderPreset<Schemes, AngularArea2D<Schemes> | K> {
  const positionWatcher = 'socketPositionWatcher' in props
    ? props.socketPositionWatcher
    : useDOMSocketPosition(props.area as AreaPlugin<Schemes, AngularArea2D<Schemes>>)
  const { node, connection, socket, control } = props.customize || {}


  return {
    update(context) {
      const data = context.data.payload

      if (context.data.type === 'connection') {
        const { start, end } = context.data

        return {
          data,
          ...(start ? { start } : {}),
          ...(end ? { end } : {}),
        }
      }
      return { data }
    },
    mount(context, plugin) {
      const parent = plugin.parentScope()
      const emit = parent.emit.bind(parent)
      const rendered = () => {
        emit({ type: 'rendered', data: context.data })
      }

      if (context.data.type === 'node') {
        const component = node ? node(context.data) : NodeComponent

        return {
          key: `node-${context.data.payload.id}`,
          component,
          props: {
            data: context.data.payload,
            emit,
            rendered
          }
        }
      }
      if (context.data.type === 'connection') {
        const component = connection ? connection(context.data) : ConnectionComponent
        const id = context.data.payload.id
        const { sourceOutput, targetInput, source, target } = context.data.payload
        const { start, end, payload } = context.data

        return {
          key: `connection-${id}`,
          component: ConnectionWrapperComponent,
          props: {
            connectionComponent: component,
            data: payload,
            start: start || ((change: any) => positionWatcher(source, 'output', sourceOutput, change)),
            end: end || ((change: any) => positionWatcher(target, 'input', targetInput, change)),
            path: async (start, end) => {
              const response = await plugin.emit({ type: 'connectionpath', data: { payload, points: [start, end] } })
              const { path, points } = response.data
              const curvature = 0.3

              if (!path && points.length !== 2) throw new Error('cannot render connection with a custom number of points')
              if (!path) return payload.isLoop
                  ? loopConnectionPath(points as [Position, Position], curvature, 120)
                  : classicConnectionPath(points as [Position, Position], curvature)

              return path
            },
            rendered
          }
        }
      }
      if (context.data.type === 'socket') {
        const component = socket ? socket(context.data) : SocketComponent

        return {
          key: `socket-${getUID()}`,
          component,
          props: {
            data: context.data.payload,
            rendered
          }
        }
      }
      if (context.data.type === 'control') {
        const component = control
          ? control(context.data)
          : (
            context.data.payload instanceof ClassicPreset.InputControl
            ? ControlComponent
            : null
          )

        if (component) {
          return {
            key: `control-${context.data.payload.id}`,
            component,
            props: {
              data: context.data.payload,
              rendered
            }
          }
        }
        return
      }
      return
    }
  }
}
