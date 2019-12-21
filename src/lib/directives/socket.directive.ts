import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Input as ReteInput, IO} from 'rete';
import {NodeService} from '../services/node.service';
import {SocketType} from '../types';

@Directive({
  selector: '[rete-socket]'
})
export class SocketDirective implements OnInit {
  @Input() io!: IO;

  constructor(private el: ElementRef, private service: NodeService) {
  }

  get type(): SocketType {
    return this.io instanceof ReteInput ? 'input' : 'output';
  }

  ngOnInit() {
    this.service.bindSocket(this.el.nativeElement, this.type, this.io);
  }
}
