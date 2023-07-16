import { Input, ElementRef, OnChanges } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[refComponent]'
})
export class RefDirective implements OnChanges {
  @Input() data!: any
  @Input() emit!: any

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.emit({ type: 'render', data: { ...this.data, element: this.el.nativeElement } })
  }
}
