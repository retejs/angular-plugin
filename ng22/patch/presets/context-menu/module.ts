import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContextMenuComponent } from './components/menu/menu.component'
import { ContextMenuSearchComponent } from './components/search/search.component'
import { ContextMenuItemComponent } from './components/item/item.component'

@NgModule({
  imports: [
    CommonModule,
    ContextMenuComponent,
    ContextMenuSearchComponent,
    ContextMenuItemComponent
  ],
  exports: [
    ContextMenuComponent,
    ContextMenuSearchComponent,
    ContextMenuItemComponent,
  ]
})
export class ReteContextMenuModule {}
