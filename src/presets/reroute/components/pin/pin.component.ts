import { Component, Input, ChangeDetectorRef, OnChanges, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';
import { Position } from '../../types';
import { useDrag } from '../../../../shared/drag'

const pinSize = 20

@Component({
  selector: 'reroute-pin',
  template: '',
  styleUrls: ['./pin.component.sass'],
  host: {
    'data-testid': 'pin'
  }
})
export class PinComponent implements OnChanges {
  @Input() position!: Position
  @Input() selected?: boolean
  @Output() menu = new EventEmitter<void>()
  @Output() translate = new EventEmitter<{ dx: number, dy: number }>()
  @Output() down = new EventEmitter<void>()

  drag = useDrag((dx, dy) => {
    this.translate.emit({ dx, dy })
  })

  @HostBinding('class.selected') get _selected() {
    return this.selected
  }
  @HostBinding('style.top') get top() {
    return `${this.position.y - pinSize / 2}px`
  }
  @HostBinding('style.left') get left() {
    return `${this.position.x - pinSize / 2}px`
  }
  @HostListener('pointerdown', ['$event']) pointerdown(event: PointerEvent) {
    event.stopPropagation()
    event.preventDefault()

    this.drag.start(event)
    this.down.emit()
  }
  @HostListener('contextmenu', ['$event']) contextmenu(event: MouseEvent) {
    event.stopPropagation()
    event.preventDefault()

    this.menu.emit()
  }

  constructor(private cdr: ChangeDetectorRef)  {
    // this.cdr.detach()
  }

  ngOnChanges(): void {
    // this.cdr.detectChanges()
    // requestAnimationFrame(() => this.rendered())
  }

}
