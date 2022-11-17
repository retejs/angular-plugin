import { ClassicPreset, getUID } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import { SocketPositionWatcher, useDOMSocketPosition } from 'rete-render-utils';
import { AngularArea2D, ClassicScheme, ExtractPayload } from './types';
import { NodeComponent } from './components/node/node.component';
import { SocketComponent } from './components/socket/socket.component';
import { ControlComponent } from './components/control/control.component';
import { ConnectionWrapperComponent } from './components/connection/connection-wrapper.component';
import { RenderPreset } from '../../types';


type AngularComponent = any
type CustomizationProps <Schemes extends ClassicScheme>= {
  node?: (data: ExtractPayload<Schemes, 'node'>) => typeof Node | null
  connection?: (data: ExtractPayload<Schemes, 'connection'>) => AngularComponent | null
  socket?: (data: ExtractPayload<Schemes, 'socket'>) => AngularComponent | null
  control?: (data: ExtractPayload<Schemes, 'control'>) => AngularComponent | null
}

type ClasssicProps<Schemes extends ClassicScheme> = (
  | { socketPositionWatcher: SocketPositionWatcher }
  | { area: AreaPlugin<Schemes, AngularArea2D<Schemes>> }
) & {
  customize?: CustomizationProps<Schemes>
}

export function setup<Schemes extends ClassicScheme>(props: ClasssicProps<Schemes>): RenderPreset<Schemes, AngularArea2D<Schemes>> {
  const positionWatcher = 'socketPositionWatcher' in props
    ? props.socketPositionWatcher
    : useDOMSocketPosition(props.area)
  const { node, connection, socket, control } = props.customize || {}


  return {
    update(context) {
      const data = { ...context.data.payload } // force change detection

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
      const emit = parent?.emit.bind(parent)
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
        const id = context.data.payload.id || getUID() // TODO pseudoconnection id
        const { sourceOutput, targetInput, source, target } = context.data.payload
        const { start, end } = context.data

        return {
          key: `connection-${id}`,
          component: ConnectionWrapperComponent,
          props: {
            data: context.data.payload,
            start: start || ((change: any) => positionWatcher(source, 'output', sourceOutput, change)),
            end: end || ((change: any) => positionWatcher(target, 'input', targetInput, change)),
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
          ? control(context.data) || (
            context.data.payload instanceof ClassicPreset.InputControl
            ? ControlComponent
            : null
          ) : null

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
