import { ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Item } from '../../types';
import { debounce } from '../../debounce';

@Component({
  selector: 'context-menu-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass', '../../block.sass']
})
export class ContextMenuItemComponent  {
  @Input() subitems?: Item[]
  @Input() delay!: number
  @Output() select = new EventEmitter<void>();
  @Output() hide = new EventEmitter<void>();

  @HostBinding('class.block') get block () { return true }
  @HostBinding('class.hasSubitems') get hasSubitems () { return this.subitems }

  @HostListener('click', ['$event']) click(event: MouseEvent) {
    event.stopPropagation()
    this.select.emit()
    this.hide.emit()
  }
  @HostListener('wheel', ['$event']) wheel(event: MouseEvent) {
    event.stopPropagation()
  }

  hideSubitems = debounce(() => {
    this.visibleSubitems = false
    this.cdr.detectChanges()
  })
  visibleSubitems = false

  @HostListener('pointerover') pointerover() {
    this.hideSubitems.cancel()
    this.visibleSubitems = true
    this.cdr.detectChanges()
  }
  @HostListener('pointerleave') pointerleave() {
    this.hideSubitems.call(this.delay)
    this.cdr.detectChanges()
  }

  constructor(private cdr: ChangeDetectorRef)  {
    this.cdr.detach()
  }
}
