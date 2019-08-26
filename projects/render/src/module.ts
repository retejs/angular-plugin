import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { NodeComponent } from './node.component';

@NgModule({
  declarations: [
    NodeComponent
  ],
  exports: [
    NodeComponent
  ],
  entryComponents: [
    NodeComponent
  ]
})
export class ReteModule {
  constructor(injector: Injector) { // StaticInjectorError due to 'npm link'
    console.log(injector);
    const NodeElement = createCustomElement(NodeComponent, { injector });
    customElements.define('rete-node', NodeElement);
  }
}
