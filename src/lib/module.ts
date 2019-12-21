import {Injector, NgModule} from '@angular/core';
import {NodeComponent} from './components/node/node.component';
import {SocketComponent} from './components/socket/socket.component';
import {ControlDirective} from './directives/control.directive';
import {SocketDirective} from './directives/socket.directive';
import {KebabPipe} from './pipes/kebab.pipe';
import {CommonModule} from '@angular/common';
import {ElementComponent} from './components/element/element.component';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    NodeComponent,
    SocketComponent,
    ElementComponent,
    ControlDirective,
    SocketDirective,
    KebabPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NodeComponent,
    SocketComponent,
    ElementComponent,
    ControlDirective,
    SocketDirective,
    KebabPipe
  ],
  entryComponents: [
    ElementComponent,
    NodeComponent
  ]
})
export class ReteModule {
  constructor(injector: Injector) {
    const ReteElement = createCustomElement(ElementComponent, {injector});
    customElements.define('rete-element', ReteElement);
  }
}
