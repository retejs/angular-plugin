import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinimapComponent } from './components/minimap/minimap.component';
import { MiniViewportComponent } from './components/mini-viewport/mini-viewport.component';
import { MiniNodeComponent } from './components/mini-node/mini-node.component';

@NgModule({
  declarations: [
    MinimapComponent,
    MiniViewportComponent,
    MiniNodeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinimapComponent,
    MiniViewportComponent,
    MiniNodeComponent
  ],
  entryComponents: [
    MinimapComponent
  ]
})
export class ReteMinimapModule {}
