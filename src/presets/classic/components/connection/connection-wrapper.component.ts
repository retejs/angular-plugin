import { Component, Input, OnInit, ChangeDetectorRef, OnChanges, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ClassicPreset } from 'rete';
import { Position } from '../../../../types';

type PositionWatcher = (cb: (value: Position) => void) => (() => void)

@Component({
  template: ''
})
export class ConnectionWrapperComponent implements OnInit, OnChanges{
  @Input() data!: ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>;
  @Input() start!: Position | PositionWatcher
  @Input() end!: Position | PositionWatcher
  @Input() path!: (start: Position, end: Position) => Promise<string>
  @Input() rendered!: any
  @Input() connectionComponent!: any

  ref!: ComponentRef<any>

  startOb: Position | null = null
  get _start(): Position | null {
    return 'x' in this.start ? this.start : this.startOb
  }
  endOb: Position | null = null
  get _end(): Position | null {
    return 'x' in this.end ? this.end : this.endOb
  }
  _path: string

  constructor(private cdr: ChangeDetectorRef, public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver)  {
    this.cdr.detach()
  }

  async ngOnChanges(): Promise<void> {
    await this.updatePath()
    requestAnimationFrame(() => this.rendered())
    this.cdr.detectChanges()
    this.update()
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
        this.update()
      })
    }
    if (typeof this.end === 'function') {
      this.end(async value => {
        this.endOb = value
        await this.updatePath()
        this.cdr.detectChanges()
        this.update()
      })
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.connectionComponent);
    this.viewContainerRef.clear();

    this.ref = this.viewContainerRef.createComponent(componentFactory);
    this.update()
  }

  update() {
    this.ref.instance.data = this.data
    this.ref.instance.start = this._start
    this.ref.instance.end = this._end
    this.ref.instance.path = this._path
    this.ref.changeDetectorRef.markForCheck();
  }
}
