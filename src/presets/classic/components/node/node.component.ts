import { Component, Input, HostBinding, ElementRef, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ClassicPreset as Classic } from 'rete';
import { Directive } from '@angular/core';
import { KeyValue } from '@angular/common';

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

type SortValue<N extends Classic.Node> = (N['controls'] | N['inputs']  | N['outputs'])[string]

@Component({
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass'],
  host: {
    'data-testid': 'node'
  }
})
export class NodeComponent implements OnChanges {
  @Input() data!: Classic.Node;
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

  sortByIndex<N extends Classic.Node, I extends KeyValue<string, SortValue<N>>>(a: I, b: I) {
    const ai = a.value?.index || 0
    const bi = b.value?.index || 0

    return ai - bi
  }
}
