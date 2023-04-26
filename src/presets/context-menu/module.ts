import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContextMenuComponent } from './components/menu/menu.component'
import { ContextMenuSearchComponent } from './components/search/search.component'
import { ContextMenuItemComponent } from './components/item/item.component'

@NgModule({
  declarations: [
    ContextMenuComponent,
    ContextMenuSearchComponent,
    ContextMenuItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContextMenuComponent,
    ContextMenuSearchComponent,
    ContextMenuItemComponent,
  ],
  entryComponents: [
    ContextMenuComponent
  ]
})
export class ReteContextMenuModule {}
