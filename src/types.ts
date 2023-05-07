import { NgElement as NgEl, NgElementStrategy } from '@angular/elements';

export type NgElement = NgEl & { ngElementStrategy: NgElementStrategy & { setInputValue(key: string, value: any): void } }
export type NodeProps = { data: any, rendered: any, emit: any } & NgElement

export type Position = { x: number, y: number }

export type RenderSignal<Type extends string, Data> =
  | { type: 'render', data: { element: HTMLElement, filled?: boolean, type: Type } & Data }
  | { type: 'rendered', data: { element: HTMLElement, type: Type } & Data }
