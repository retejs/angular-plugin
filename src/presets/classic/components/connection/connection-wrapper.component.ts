import { Component, Input, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ClassicPreset } from 'rete';
import { Position } from '../../../../types';

type PositionWatcher = (cb: (value: Position) => void) => (() => void)

@Component({
  template: `<connection
      *ngIf="_start && _end && _path"
      [data]="data"
      [start]="_start"
      [end]="_end"
      [path]="_path"
    ></connection>`
})
export class ConnectionWrapperComponent implements OnInit, OnChanges{
  @Input() data!: ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>;
  @Input() start!: Position | PositionWatcher
  @Input() end!: Position | PositionWatcher
  @Input() path!: (start: Position, end: Position) => Promise<string>
  @Input() rendered!: any

  startOb: Position | null = null
  get _start(): Position | null {
    return 'x' in this.start ? this.start : this.startOb
  }
  endOb: Position | null = null
  get _end(): Position | null {
    return 'x' in this.end ? this.end : this.endOb
  }
  _path: string

  constructor(private cdr: ChangeDetectorRef)  {
    this.cdr.detach()
  }

  async ngOnChanges(): Promise<void> {
    await this.updatePath()
    requestAnimationFrame(() => this.rendered())
    this.cdr.detectChanges()
  }

  async updatePath() {
    if (this._start && this._end) {
      this._path = await this.path(this._start, this._end)
    }
  }

  ngOnInit() {
    if (typeof this.start === 'function') {
      this.start(async value => {
        this.startOb = value
        await this.updatePath()
        this.cdr.detectChanges()
      })
    }
    if (typeof this.end === 'function') {
      this.end(async value => {
        this.endOb = value
        await this.updatePath()
        this.cdr.detectChanges()
      })
    }
  }
}
