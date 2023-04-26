import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinsComponent } from './components/pins/pins.component';
import { PinComponent } from './components/pin/pin.component';

@NgModule({
  declarations: [
    PinsComponent,
    PinComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PinsComponent,
    PinComponent,
  ],
  entryComponents: [
    PinsComponent
  ]
})
export class ReteRerouteModule {}
