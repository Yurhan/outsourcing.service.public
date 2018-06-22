import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfoService } from '../../services/apis';
import { ICompanyDetailedInfo } from '../../models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { IContact } from '../../models/contact';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  public companyInfo: ICompanyDetailedInfo;
  public contact: IContact;
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
          this.contact = this.companyInfo.contact;
        });
    });
  }

  public formatPhoneNumbers(phones: string[]): string {
    if (phones && phones.length > 0) {
      return phones.join(', ');
    }
    return '';
  }

  public showMobPhones(): boolean {
    return this.contact && this.contact.mobPhones && this.contact.mobPhones.length > 0;
  }
}
