import { Component, Input, HostBinding, HostListener } from '@angular/core';
import { useDrag } from '../../../../shared/drag';
import { MinimapData } from '../../types';

@Component({
  selector: 'minimap-mini-viewport',
  templateUrl: './mini-viewport.component.html',
  styleUrls: ['./mini-viewport.component.sass']
})
export class MiniViewportComponent {
  @Input() left!: number
  @Input() top!: number
  @Input() width!: number
  @Input() height!: number
  @Input() containerWidth!: number
  @Input() translate!: MinimapData['translate']

  drag = useDrag((dx, dy) => this.onDrag(dx, dy))

  @HostBinding('style.left') get styleLeft() {
    return this.px(this.scale(this.left))
  }
  @HostBinding('style.top') get styleTop() {
    return this.px(this.scale(this.top))
  }
  @HostBinding('style.width') get styleWidth() {
    return this.px(this.scale(this.width))
  }
  @HostBinding('style.height') get styleHeight() {
    return this.px(this.scale(this.height))
  }

  @HostListener('pointerdown', ['$event']) pointerdown(event: PointerEvent) {
    event.stopPropagation()
    this.drag.start(event)
  }

  px(value: number) {
    return `${value}px`
  }

  scale(v: number) {
    return v * this.containerWidth
  }

  invert(v: number) {
    return v / this.containerWidth
  }

  onDrag(dx: number, dy: number) {
    this.translate(this.invert(-dx), this.invert(-dy))
  }
}
