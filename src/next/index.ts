import { Injector } from '@angular/core';
import { BaseSchemes, Scope } from 'rete'
import { Area2DInherited, RenderData } from 'rete-area-plugin'
import { createCustomElement } from '@angular/elements';

import { ExtraRender, NgElement, NodeProps, Position, RenderPreset } from './types'

export * as Presets from './presets'

export { AngularArea2D } from './presets/classic/types'
export { ReteModule } from './module'
export * from './presets/classic/components'

console.log('angular-render')

type Item = { key: string, ngElement: NgElement }

type Renderer = {
  get(element: HTMLElement): Item | undefined
  mount(element: HTMLElement, key: string, component: any, injector: Injector, props: Record<string, unknown>): void
  update(item: Item, props: Record<string, unknown>): void
  unmount(element: HTMLElement): void
}
function getRenderer(): Renderer {
  const elements = new WeakMap<HTMLElement, Item>()

  return {
    get(element) {
      return elements.get(element)
    },
    mount(element, key, component, injector, props) {
      customElements.define(key, createCustomElement(component, { injector }))

      const ngElement = document.createElement(key) as NodeProps & NgElement & typeof props

      Object.keys(props).forEach(key => {
        ngElement[key] = props[key]
      })

      element.appendChild(ngElement)
      elements.set(element, { key, ngElement })
    },
    update({ ngElement }, props) {
      Object.keys(props).forEach(key => {
        ngElement.ngElementStrategy.setInputValue(key, props[key])
      })
    },
    unmount(element) {
      const existing = elements.get(element)

      if (existing) {
        existing.ngElement.remove()
        elements.delete(element)
      }
    }
  }
}
type Produces<Schemes extends BaseSchemes> =
    | { type: 'connectionpath', data: { payload: Schemes['Connection'], path?: string, points: Position[] } }

export class AngularRenderPlugin<Schemes extends BaseSchemes, T extends ExtraRender = never> extends Scope<Produces<Schemes>, Area2DInherited<Schemes, T>> {
  presets: RenderPreset<Schemes, T>[] = []
  renderer: Renderer
  owners = new WeakMap<HTMLElement, RenderPreset<Schemes, T>>()

  constructor(private params: { injector: Injector }) {
    super('angular-render')
    this.renderer = getRenderer()

    this.addPipe(context => {
      if (!('type' in context)) return
      if (context.type === 'unmount') {
        this.unmount(context.data.element)
      } else if (context.type === 'render') {
        if ('filled' in context.data && context.data.filled) {
          return context
        }
        if (this.mount(context.data.element, context as T)) {
          return {
            ...context,
            data: {
                ...context.data,
                filled: true
            }
          }
        }
      }
      return context
    })
  }

  private unmount(element: HTMLElement) {
    this.owners.delete(element)
    this.renderer.unmount(element)
  }

  private mount(element: HTMLElement, context: T) {
    const existing = this.renderer.get(element)

    if (existing) {
      this.presets.forEach(preset => {
        if (this.owners.get(element) !== preset) return
        const result = preset.update(context as T, this)

        if (result) {
          this.renderer.update(existing, result)
        }
      })
      return true // TODO ??
    }

    for (const preset of this.presets) {
      const result = preset.mount(context, this)

      if (!result) continue

      const { key, component, props } = result

      this.renderer.mount(element, key, component, this.params.injector, props)

      this.owners.set(element, preset)
      return true
    }
    return
  }

  public addPreset(preset: RenderPreset<Schemes, T | { type: 'render', data: RenderData<Schemes> }>) {
    this.presets.push(preset)
  }
}
