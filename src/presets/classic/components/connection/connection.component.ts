import { Component, Input } from '@angular/core';
import { ClassicPreset } from 'rete';
import { classicConnectionPath } from 'rete-render-utils'
import { Position } from '../../../../types';


@Component({
  selector: 'connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.sass']
})
export class ConnectionComponent {
  @Input() data!: ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>;
  @Input() start: Position
  @Input() end: Position
  @Input() path: string
}
