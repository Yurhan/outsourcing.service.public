import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutsModule } from '../../../layouts';
import { WidgetsModule } from '../widgets';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

// import { AdminComponent } from './admin.component';

// import { PdsCoreModule } from 'powerschool-design-system/dist/angular-modules/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    WidgetsModule
  ],
  declarations: [
    SettingsComponent
  ],
  entryComponents: [
    SettingsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
}
