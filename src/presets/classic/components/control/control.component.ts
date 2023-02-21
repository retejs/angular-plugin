import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnChanges, SimpleChanges, AfterViewChecked, ChangeDetectorRef, HostListener } from '@angular/core';
import { ClassicPreset } from 'rete';

@Component({
  templateUrl: `./control.component.html`,
  styleUrls: ['./control.component.sass']
})
export class ControlComponent<T extends 'text' | 'number'> implements OnChanges {
  @Input() data!: ClassicPreset.InputControl<T>;
  @Input() rendered!: any;

  value?: T extends 'text' ? string : number

  @HostListener('pointerdown', ['$event'])
  public pointerdown(event: any) {
    event.stopPropagation();
  }

  constructor(private cdr: ChangeDetectorRef)  {
    this.cdr.detach()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data = changes['data']
    const currentValue: ClassicPreset.InputControl<T> = data.currentValue

    if (currentValue.value !== this.value) {
      this.value = currentValue.value
    }
    this.cdr.detectChanges()
    requestAnimationFrame(() => this.rendered())
  }

  onChange(e: Event) {
    const target = e.target as HTMLInputElement
    const value = (this.data.type === 'number'
        ? +target.value
        : target.value) as ClassicPreset.InputControl<T>['value']

    this.value = value
    this.data.setValue(value)
  }
}
