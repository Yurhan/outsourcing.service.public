import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  RouteRequiresAdminAuthorizedUser,
  RouteAsksToConfirmUnsavedChanges
} from '../../../services';

import { ManagementComponent } from './management/management.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      redirectTo: 'settings',
      pathMatch: 'full'
    }, {
      path: 'settings',
      canActivate: [RouteRequiresAdminAuthorizedUser],
      canDeactivate: [RouteAsksToConfirmUnsavedChanges],
      component: ManagementComponent
    }])
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsRoutingModule {

}