import { Component, Input, OnInit, Injector, ComponentFactoryResolver, ViewContainerRef, Type, ChangeDetectionStrategy, OnChanges, SimpleChanges, ComponentRef, ElementRef } from '@angular/core';
// import { Props } from './types';

@Component({
    template: '<ng-container *ngComponentOutlet="component;content:props"></ng-container>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent implements OnInit {
  @Input() component!: Type<Component>;
  @Input() props!: any;//Props;

  componentRef: ComponentRef<Component>
  constructor(
    // private vcr: ViewContainerRef,
    // private injector: Injector,
    private host: ElementRef,
    // private factoryResolver: ComponentFactoryResolver
  ) {
    this.host.nativeElement.update = this.update.bind(this);
    console.log('this.host', this.host)
  }

  ngOnInit() {
    // const factory = this.factoryResolver.resolveComponentFactory(this.component);

    // this.componentRef = factory.create(this.injector);
    // this.update()
    // this.vcr.insert(this.componentRef.hostView);
  }

  update() {
    // console.log('update')
    // const ref = this.componentRef
    // const { props } = this;

    // console.log(props, ref)
    // for(let key in props) {
    //   // Object.defineProperty(ref.instance, key, {
    //   //   get() { return props[key]; },
    //   //   set(val) { props[key] = val; },
    //   //   configurable: true
    //   // })
    //   ref.instance[key] = props[key]
    // }
    // ref.changeDetectorRef.detectChanges()
    // (ref.instance as any).update()
  }

  ngOnDestroy() {
    // this.vcr.detach(0);
  }
}
