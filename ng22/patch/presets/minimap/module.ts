import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinimapComponent } from './components/minimap/minimap.component';
import { MiniViewportComponent } from './components/mini-viewport/mini-viewport.component';
import { MiniNodeComponent } from './components/mini-node/mini-node.component';

@NgModule({
  imports: [
    CommonModule,
    MinimapComponent,
    MiniViewportComponent,
    MiniNodeComponent
  ],
  exports: [
    MinimapComponent,
    MiniViewportComponent,
    MiniNodeComponent
  ]
})
export class ReteMinimapModule {}
