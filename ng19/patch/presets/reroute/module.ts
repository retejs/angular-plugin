import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinsComponent } from './components/pins/pins.component';
import { PinComponent } from './components/pin/pin.component';

@NgModule({
  imports: [
    CommonModule,
    PinsComponent,
    PinComponent,
  ],
  exports: [
    PinsComponent,
    PinComponent,
  ]
})
export class ReteRerouteModule {}
