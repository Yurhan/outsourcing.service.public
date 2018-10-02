import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CompanyInfoService,
  PictureService
} from '../../../services/apis';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

import * as _ from 'lodash';
import { ICompanyInfo } from '../../../models';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class CompanyInfoEditComponent implements AfterViewInit {

  public companyInfo: ICompanyInfo;
  private routeSub: Subscription;

  constructor(
    private comapnyInfoApi: CompanyInfoService,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    let paramsObsComb = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));

    this.routeSub = paramsObsComb.subscribe(p => {
      this.comapnyInfoApi.getInfo()
        .subscribe(companyInfo => {
          this.companyInfo = companyInfo;
          this.companyInfo.title = this.companyInfo.title || '';
          this.companyInfo.subTitle = this.companyInfo.subTitle || '';
        });
    });
  }


  public submit(): void {

    let obs = this.companyInfo.id
      ? this.comapnyInfoApi.createOne(this.companyInfo)
      : this.comapnyInfoApi.updateOne(this.companyInfo)

    obs.subscribe(() => {
      console.log('Successufully submittted');
    })

  }
}
