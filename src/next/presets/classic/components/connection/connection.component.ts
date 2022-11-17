import { Component, Input } from '@angular/core';
import { ClassicPreset } from 'rete';
import { classicConnectionPath } from 'rete-render-utils'


@Component({
  selector: 'connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.sass']
})
export class ConnectionComponent {
  @Input() data!: ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>;
  @Input() start: any
  @Input() end: any

  get path() {
    return classicConnectionPath([this.start.x, this.start.y, this.end.x, this.end.y], 0.3)
  }
}
