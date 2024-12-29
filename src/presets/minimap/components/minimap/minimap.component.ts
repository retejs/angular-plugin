import { Component, Input, ChangeDetectorRef, OnChanges, HostListener, ElementRef, HostBinding } from '@angular/core';
import { MinimapData } from '../../types';
// [imports]

@Component({
  // [component-directive]
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.sass'],
  host: {
    'data-testid': 'minimap'
  }
})
export class MinimapComponent implements OnChanges {
  @Input() rendered!: () => void
  @Input() size!: number
  @Input() ratio!: MinimapData['ratio']
  @Input() nodes!: MinimapData['nodes']
  @Input() viewport!: MinimapData['viewport']
  @Input() translate!: MinimapData['translate']
  @Input() point!: MinimapData['point']

  @HostBinding('style.width') get width() {
    return this.px(this.size * this.ratio)
  }
  @HostBinding('style.height') get height() {
    return this.px(this.size)
  }

  @HostListener('pointerdown', ['$event']) pointerdown(event: PointerEvent) {
    event.stopPropagation()
    event.preventDefault()
  }

  @HostListener('dblclick', ['$event']) dblclick(event: MouseEvent) {
    event.stopPropagation()
    event.preventDefault()

    if (!this.el.nativeElement) return
    const box = this.el.nativeElement.getBoundingClientRect()
    const x = (event.clientX - box.left) / (this.size * this.ratio)
    const y = (event.clientY - box.top) / (this.size * this.ratio)

    this.point(x, y)
  }

  constructor(public el: ElementRef, private cdr: ChangeDetectorRef)  {
    this.cdr.detach()
  }

  ngOnChanges(): void {
    this.cdr.detectChanges()
    requestAnimationFrame(() => this.rendered())
  }

  px(value: number) {
    return `${value}px`
  }

  scale(value: number) {
    if (!this.el.nativeElement) return 0

    return value * this.el.nativeElement.clientWidth
  }

  identifyMiniNode(_: number, item: MinimapData['nodes'][number]) {
    return [item.top, item.left].join('_')
  }
}
