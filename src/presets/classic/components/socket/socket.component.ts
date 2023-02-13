import { Component, Input, HostBinding, AfterViewChecked, ChangeDetectorRef, OnChanges } from '@angular/core';

@Component({
  template: ``,
  styleUrls: ['./socket.component.sass']
})
export class SocketComponent implements OnChanges {
  @Input() data!: any;
  @Input() rendered!: any;


  @HostBinding('title') get title() {
    return this.data.name
  }

  constructor(private cdr: ChangeDetectorRef)  {
    this.cdr.detach()
  }

  ngOnChanges(): void {
    this.cdr.detectChanges()
    requestAnimationFrame(() => this.rendered())
  }
}
