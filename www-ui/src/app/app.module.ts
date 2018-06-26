import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { WidgetsModule } from './widgets';

// import { AgmCoreModule } from '@agm/core';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  DateTimeHelperService,
  BaseHttpService
} from '../services/logic';

import {
  CompanyInfoService,
  CompanyPartnerService,
  CompanyServicesService,
  JobVacancyService,
  UserService,
  GoogleMapService,
  PictureService
} from '../services/apis';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WidgetsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    CompanyInfoService,
    CompanyPartnerService,
    CompanyServicesService,
    JobVacancyService,
    UserService,
    GoogleMapService,
    PictureService,
    DateTimeHelperService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [
        XHRBackend,
        RequestOptions,
        Router
      ]
    }
  ]
})
export class AppModule { }

function httpFactory(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
  router: Router
): BaseHttpService {
  return new BaseHttpService(
    backend,
    defaultOptions,
    router);
};
