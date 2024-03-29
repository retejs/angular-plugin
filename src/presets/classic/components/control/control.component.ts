import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, HostListener } from '@angular/core';
import { ClassicPreset } from 'rete';

@Component({
  templateUrl: `./control.component.html`,
  styleUrls: ['./control.component.sass']
})
export class ControlComponent<T extends 'text' | 'number'> implements OnChanges {
  @Input() data!: ClassicPreset.InputControl<T>;
  @Input() rendered!: any;


  @HostListener('pointerdown', ['$event'])
  public pointerdown(event: any) {
    event.stopPropagation();
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const seed = changes['seed']
    const data = changes['data']

    if ((seed && seed.currentValue !== seed.previousValue)
      || (data && data.currentValue !== data.previousValue)) {
      this.cdr.detectChanges()
    }
    requestAnimationFrame(() => this.rendered())
  }

  onChange(e: Event) {
    const target = e.target as HTMLInputElement
    const value = (this.data.type === 'number'
      ? +target.value
      : target.value) as ClassicPreset.InputControl<T>['value']

    this.data.setValue(value)
    this.cdr.detectChanges()
  }
}
