import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'minimap-mini-node',
  templateUrl: './mini-node.component.html',
  styleUrls: ['./mini-node.component.sass'],
  host: {
    'data-testid': 'minimap-node'
  }
})
export class MiniNodeComponent {
  @Input() left!: number
  @Input() top!: number
  @Input() width!: number
  @Input() height!: number

  @HostBinding('style.left') get styleLeft() {
    return this.px(this.left)
  }
  @HostBinding('style.top') get styleTop() {
    return this.px(this.top)
  }
  @HostBinding('style.width') get styleWidth() {
    return this.px(this.width)
  }
  @HostBinding('style.height') get styleHeight() {
    return this.px(this.height)
  }

  px(value: number) {
    return `${value}px`
  }

}
