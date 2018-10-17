import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CompanyServicesService
  // ,
  // PictureService
} from '../../../services/apis';
import { Observable } from 'rxjs';
import { ICompanyServices } from '../../../models';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class ServiceEditComponent implements AfterViewInit {

  public services: ICompanyServices[];

  constructor(
    private companyServicesApi: CompanyServicesService,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    let paramsObsComb = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));

    paramsObsComb.subscribe(p => {
      this.companyServicesApi.getList()
        .subscribe(services => this.services = services);
    });
  }

  public submit(companyService: ICompanyServices): void {
    let obs = this.companyServicesApi.submitOne(companyService);
    obs.subscribe(() => {
      console.log('Successufully submittted');
    });
  }
}
