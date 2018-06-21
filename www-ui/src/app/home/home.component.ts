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

  public lat: number = 51.678418;
  public lng: number = 7.809007;

  public contact: IContact = {
    address: {
      city: 'Львів',
      street: 'Гайдамацька 11'
    },
    primaryPhone: '(032) 253 90 08',
    mobPhones: ['(093) 429 05 34', '066 87 46 350']
  }

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
