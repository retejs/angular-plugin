import {Component, Input} from '@angular/core';
import {Input as ReteInput, IO, Socket} from 'rete';
import {SocketType} from '../../types';

@Component({
  selector: 'rete-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.sass']
})
export class SocketComponent {
  @Input() socket!: Socket;
  @Input() io!: IO;

  get type(): SocketType {
    return this.io instanceof ReteInput ? 'input' : 'output';
  }
}
