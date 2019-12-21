import {Component, ComponentFactoryResolver, Injector, Input, OnDestroy, OnInit, Type, ViewContainerRef} from '@angular/core';
import {Props} from '../../types';

@Component({
  template: ''
})
export class ElementComponent implements OnInit, OnDestroy {
  @Input() component!: Type<Component>;
  @Input() props!: Props;

  constructor(
    private vcr: ViewContainerRef,
    private injector: Injector,
    private factoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    if (this.component === undefined) {
      return;
    }

    const factory = this.factoryResolver.resolveComponentFactory(this.component);
    const componentRef = factory.create(this.injector);
    const {props} = this;

    for (const key of Object.keys(props)) {
      Object.defineProperty(componentRef.instance, key, {
        get() {
          return props[key];
        },
        set(val) {
          props[key] = val;
        }
      });
    }

    this.vcr.insert(componentRef.hostView);
  }

  ngOnDestroy() {
    this.vcr.detach(0);
  }
}
