import { Component, Input, HostBinding, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ClassicPreset as Classic } from 'rete';
import { KeyValue } from '@angular/common';
// [imports]

type NodeExtraData = { width?: number, height?: number }
type SortValue<N extends Classic.Node> = (N['controls'] | N['inputs'] | N['outputs'])[string]

@Component({
  // [component-directive]
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass'],
  host: {
    'data-testid': 'node'
  }
})
export class NodeComponent implements OnChanges {
  @Input() data!: Classic.Node & NodeExtraData;
  @Input() emit!: (data: any) => void
  @Input() rendered!: () => void

  seed = 0

  @HostBinding('style.width.px') get width() {
    return this.data.width
  }

  @HostBinding('style.height.px') get height() {
    return this.data.height
  }

  @HostBinding('class.selected') get selected() {
    return this.data.selected
  }

  constructor(private cdr: ChangeDetectorRef) {
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
