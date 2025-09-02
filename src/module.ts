import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodeComponent } from './presets/classic/components/node/node.component';
import { ConnectionComponent } from './presets/classic/components/connection/connection.component';
import { SocketComponent } from './presets/classic/components/socket/socket.component';
import { ConnectionWrapperComponent } from './presets/classic/components/connection/connection-wrapper.component';
import { ControlComponent } from './presets/classic/components/control/control.component';
import { RefDirective } from './ref';
import { ImpureKeyvaluePipe } from './shared/pipes/impure-keyvalue.pipe';

@NgModule({
  declarations: [
    RefDirective,
    NodeComponent,
    ConnectionComponent,
    ConnectionWrapperComponent,
    SocketComponent,
    ControlComponent,
    ImpureKeyvaluePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RefDirective,
    NodeComponent,
    ConnectionComponent,
    ConnectionWrapperComponent,
    SocketComponent,
    ControlComponent,
    ImpureKeyvaluePipe
  ],
  entryComponents: [
    NodeComponent,
    ConnectionComponent,
    ConnectionWrapperComponent,
    SocketComponent,
    ControlComponent
  ]
})
export class ReteModule { }
