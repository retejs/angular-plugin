import { Component, Input, ChangeDetectionStrategy, HostBinding, ElementRef, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ClassicPreset } from 'rete';
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

@Component({
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass']
})
export class NodeComponent implements OnChanges {
  @Input() data!: ClassicPreset.Node;
  @Input() emit!: (data: any) => void
  @Input() rendered!: () => void

  seed = 0

  @HostBinding('class.selected') get selected() {
    return this.data.selected
  }

  constructor(private cdr: ChangeDetectorRef)  {
    this.cdr.detach()
  }

  ngOnChanges(): void {
    this.cdr.detectChanges()
    requestAnimationFrame(() => this.rendered())
    this.seed++ // force render sockets
  }
}
