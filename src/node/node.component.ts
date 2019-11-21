import {Component, Input} from '@angular/core';
import {Node, NodeEditor} from 'rete';
import {NodeService} from '../node.service';

@Component({
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass'],
  providers: [NodeService]
})
export class NodeComponent {
  @Input() editor!: NodeEditor;
  @Input() node!: Node;
  @Input() bindSocket!: Function;
  @Input() bindControl!: Function;

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
