import { Component, Input, ChangeDetectorRef, OnChanges, OnDestroy, HostListener, HostBinding } from '@angular/core';
import { Item } from '../../types';
import { debounce } from '../../debounce';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass', '../../block.sass'],
  host: {
    'data-testid': 'context-menu'
  }
})
export class ContextMenuComponent implements OnChanges, OnDestroy {
  @Input() items!: Item[]
  @Input() delay!: number
  @Input() searchBar?: boolean
  @Input() onHide!: () => void
  @Input() rendered!: () => void

  public filter: string = ''

  hide = debounce(() => {
    this.onHide()
    this.cdr.detectChanges()
  })

  @HostBinding('attr.rete-context-menu') customAttribute = ''

  @HostListener('mouseover') pointerover() {
    this.hide.cancel()
    this.cdr.detectChanges()
  }
  @HostListener('mouseleave') pointerleave() {
    this.hide.call(this.delay)
    this.cdr.detectChanges()
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach()
  }

  ngOnChanges(): void {
    this.cdr.detectChanges()
    requestAnimationFrame(() => this.rendered())
  }

  setFilter(value: string) {
    this.filter = value
    this.cdr.detectChanges()
  }

  getItems() {
    const filterRegexp = new RegExp(this.filter, 'i')
    const filteredList = this.items.filter(item => (
      item.label.match(filterRegexp)
    ))

    return filteredList
  }

  ngOnDestroy(): void {
    if (this.hide) this.hide.cancel()
  }
}
