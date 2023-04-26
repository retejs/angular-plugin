import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'context-menu-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class ContextMenuSearchComponent {
  @Input() value!: string
  @Output() update = new EventEmitter<string>()
}
