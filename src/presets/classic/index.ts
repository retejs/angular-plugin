import { Type } from '@angular/core';
import { ClassicPreset, getUID, Scope } from 'rete';
import { classicConnectionPath, loopConnectionPath, SocketPositionWatcher, getDOMSocketPosition } from 'rete-render-utils';
import { AngularArea2D, ClassicScheme, ExtractPayload } from './types';
import { NodeComponent } from './components/node/node.component';
import { SocketComponent } from './components/socket/socket.component';
import { ControlComponent } from './components/control/control.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ConnectionWrapperComponent } from './components/connection/connection-wrapper.component';
import { Position } from '../../types';
import { RenderPreset } from '../types'

type AngularComponent = Type<any>
type CustomizationProps<Schemes extends ClassicScheme> = {
  node?: (data: ExtractPayload<Schemes, 'node'>) => AngularComponent | null
  connection?: (data: ExtractPayload<Schemes, 'connection'>) => AngularComponent | null
  socket?: (data: ExtractPayload<Schemes, 'socket'>) => AngularComponent | null
  control?: (data: ExtractPayload<Schemes, 'control'>) => AngularComponent | null
}

type ClassicProps<Schemes extends ClassicScheme, K> = {
  socketPositionWatcher?: SocketPositionWatcher<Scope<never, [K]>>
  customize?: CustomizationProps<Schemes>
}

/**
 * Classic preset for rendering nodes, connections, controls and sockets.
 */
export function setup<Schemes extends ClassicScheme, K extends AngularArea2D<Schemes>>(
  props?: ClassicProps<Schemes, K>
): RenderPreset<Schemes, K> {
  const positionWatcher = typeof props?.socketPositionWatcher === 'undefined'
    ? getDOMSocketPosition<Schemes, any>() // fix Type instantiation is excessively deep and possibly infinite.
    : props?.socketPositionWatcher
  const { node, connection, socket, control } = props?.customize || {}


  return {
    attach(plugin) {
      positionWatcher.attach(plugin as unknown as Scope<never, [K]>)
    },
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
            start: start || ((change: any) => positionWatcher.listen(source, 'output', sourceOutput, change)),
            end: end || ((change: any) => positionWatcher.listen(target, 'input', targetInput, change)),
            path: async (start, end) => {
              const response = await plugin.emit({ type: 'connectionpath', data: { payload, points: [start, end] } })

              if (!response) return ''

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
