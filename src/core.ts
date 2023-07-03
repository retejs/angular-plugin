import { Injector } from '@angular/core';
import { BaseSchemes, CanAssignSignal, Scope } from 'rete'
import { createCustomElement } from '@angular/elements';

import { NgElement, NodeProps, Position, RenderSignal } from './types'
import { RenderPreset } from './presets/types';

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
      // LIMITATION: If an element is remounted with the same identifier, the component cannot be replaced
      const exists = customElements.get(key)

      if (!exists) {
        customElements.define(key, createCustomElement(component, { injector }))
      }

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
      ngElement.ngElementStrategy.setInputValue('seed', Math.random())
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

type Requires<Schemes extends BaseSchemes> =
  | RenderSignal<'node', { payload: Schemes['Node'] }>
  | RenderSignal<'connection', { payload: Schemes['Connection'], start?: Position, end?: Position }>
  | { type: 'unmount', data: { element: HTMLElement } }

export class AngularPlugin<Schemes extends BaseSchemes, T = Requires<Schemes>> extends Scope<Produces<Schemes>, [Requires<Schemes> | T]> {
  presets: RenderPreset<Schemes, T>[] = []
  renderer: Renderer
  owners = new WeakMap<HTMLElement, RenderPreset<Schemes, T>>()

  constructor(private params: { injector: Injector }) {
    super('angular-render')
    this.renderer = getRenderer()

    this.addPipe(context => {
      if (!context || typeof context !== 'object' || !('type' in context)) return context
      if (context.type === 'unmount') {
        this.unmount(context.data.element)
      } else if (context.type === 'render') {
        if ('filled' in context.data && context.data.filled) {
          return context
        }
        if (this.mount(context.data.element, context)) {
          return {
            ...context,
            data: {
              ...context.data,
              filled: true
            }
          } as typeof context
        }
      }
      return context
    })
  }

  setParent(scope: Scope<Requires<Schemes> | T>): void {
    super.setParent(scope)

    this.presets.forEach(preset => {
      if (preset.attach) preset.attach(this)
    })
  }


  private unmount(element: HTMLElement) {
    this.owners.delete(element)
    this.renderer.unmount(element)
  }

  private mount(element: HTMLElement, context: Requires<Schemes>) {
    const existing = this.renderer.get(element)

    if (existing) {
      this.presets.forEach(preset => {
        if (this.owners.get(element) !== preset) return
        const result = preset.update(context as unknown as Extract<T, { type: 'render' }>, this)

        if (result) {
          this.renderer.update(existing, result)
        }
      })
      return true
    }

    for (const preset of this.presets) {
      const result = preset.mount(context as unknown as Extract<T, { type: 'render' }>, this)

      if (!result) continue

      const { key, component, props } = result

      this.renderer.mount(element, key, component, this.params.injector, props)

      this.owners.set(element, preset)
      return true
    }
    return
  }

  public addPreset<K>(preset: RenderPreset<Schemes, CanAssignSignal<T, K> extends true ? K : 'Cannot apply preset. Provided signals are not compatible'>) {
    const local = preset as unknown as RenderPreset<Schemes, T>

    if (local.attach) local.attach(this)
    this.presets.push(local)
  }
}
