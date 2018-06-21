import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfoService } from '../../services/apis';
import { ICompanyDetailedInfo } from '../../models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  public lat: number = 51.678418;
  public lng: number = 7.809007;

  public companyInfo: ICompanyDetailedInfo;
  private routeSub: Subscription;


  constructor(
    private comapnyInfoApi: CompanyInfoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public ngAfterViewInit(): void {
    let paramsObsComb = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));

    this.routeSub = paramsObsComb.subscribe(p => {
      this.comapnyInfoApi.getDetailed()
        .subscribe(companyInfo => {
          this.companyInfo = companyInfo;
        });
    });
  }
}
