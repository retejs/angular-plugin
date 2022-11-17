import { Component, Input, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ClassicPreset } from 'rete';
import { Position } from '../../../../types';

type PositionWatcher = (cb: (value: Position) => void) => (() => void)

@Component({
  template: '<connection *ngIf="_start && _end" [data]="data" [start]="_start" [end]="_end"></connection>',
  styleUrls: ['./connection.component.sass']
})
export class ConnectionWrapperComponent implements OnInit {
  @Input() data!: ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>;
  @Input() start!: Position | PositionWatcher
  @Input() end!: Position | PositionWatcher
  @Input() rendered!: any

  startOb: Position | null = null
  get _start(): Position | null {
    return 'x' in this.start ? this.start : this.startOb
  }
  endOb: Position | null = null
  get _end(): Position | null {
    return 'x' in this.end ? this.end : this.endOb
  }

  constructor(private cdr: ChangeDetectorRef)  {
    this.cdr.detach()
  }

  ngOnChanges(): void {
    this.cdr.detectChanges()
    requestAnimationFrame(() => this.rendered())
  }

  ngOnInit() {
    if (typeof this.start === 'function') {
      this.start(value => {
        this.startOb = value
        this.cdr.detectChanges()
      })
    }
    if (typeof this.end === 'function') {
      this.end(value => {
        this.endOb = value
        this.cdr.detectChanges()
      })
    }
  }
}
