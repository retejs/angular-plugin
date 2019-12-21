import {Component, Input, OnInit} from '@angular/core';
import {Control, IO, Node, NodeEditor} from 'rete';
import {NodeService} from '../../services/node.service';
import {SocketType} from '../../types';

@Component({
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass'],
  providers: [NodeService]
})
export class NodeComponent implements OnInit {
  @Input() editor!: NodeEditor;
  @Input() node!: Node;
  @Input() bindSocket!: (el: HTMLElement, type: SocketType, io: IO) => void;
  @Input() bindControl!: (el: HTMLElement, control: Control) => void;

  constructor(protected service: NodeService) {
  }

  get inputs() {
    return Array.from(this.node.inputs.values());
  }

  get outputs() {
    return Array.from(this.node.outputs.values());
  }

  get controls() {
    return Array.from(this.node.controls.values());
  }

  ngOnInit() {
    this.service.setBindings(this.bindSocket, this.bindControl);
  }

  selected() {
    return this.editor.selected.contains(this.node) ? 'selected' : '';
  }
}
