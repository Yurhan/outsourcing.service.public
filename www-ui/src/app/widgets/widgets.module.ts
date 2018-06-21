import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MenuButtonComponent,
    HeaderComponent,
    PageLayoutComponent,
    GoogleMapComponent
  ],
  exports: [
    MenuButtonComponent,
    HeaderComponent,
    PageLayoutComponent,
    GoogleMapComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class WidgetsModule { }
