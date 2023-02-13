import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodeComponent, RefDirective } from './presets/classic/components/node/node.component';
import { ConnectionComponent } from './presets/classic/components/connection/connection.component';
import { SocketComponent } from './presets/classic/components/socket/socket.component';
import { ConnectionWrapperComponent } from './presets/classic/components/connection/connection-wrapper.component';
import { ControlComponent } from './presets/classic/components/control/control.component';

export const key = 'rete-angular-render-element'

@NgModule({
  declarations: [
    RefDirective,
    NodeComponent,
    ConnectionComponent,
    ConnectionWrapperComponent,
    SocketComponent,
    ControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NodeComponent,
    ConnectionComponent,
    ConnectionWrapperComponent,
    SocketComponent,
    ControlComponent
  ],
  entryComponents: [
    NodeComponent,
    ConnectionComponent,
    ConnectionWrapperComponent,
    SocketComponent,
    ControlComponent
  ]
})
export class ReteModule {}
