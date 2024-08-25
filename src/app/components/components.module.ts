import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderTabsComponent } from './header-tabs/header-tabs.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    HeaderTabsComponent
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    HeaderTabsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    RouterModule  
  ]
})
export class ComponentsModule { }
