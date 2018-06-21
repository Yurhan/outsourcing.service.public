import { NgModule, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ],
      { enableTracing: isDevMode() }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
