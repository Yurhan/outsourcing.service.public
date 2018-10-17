import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyInfoService } from '../../../services/apis';
import { Observable } from 'rxjs';

import { ICompanyInfo } from '../../../models';

@Component({
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})

export class CompanyInfoEditComponent implements AfterViewInit {

  public companyInfo: ICompanyInfo;

  constructor(
    private comapnyInfoApi: CompanyInfoService,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    let paramsObsComb = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));

    paramsObsComb.subscribe(p => {
      this.comapnyInfoApi.getInfo()
        .subscribe(companyInfo => {
          this.companyInfo = companyInfo;
          this.companyInfo.title = this.companyInfo.title || '';
          this.companyInfo.subTitle = this.companyInfo.subTitle || '';
        });
    });
  }


  public submit(): void {
    let obs = this.comapnyInfoApi.submitOne(this.companyInfo);
    obs.subscribe(() => {
      console.log('Successufully submittted');
    });
  }
}
