import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CompanyInfoService
} from '../../services/apis';
import { ICompanyDetailedInfo } from '../../models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements AfterViewInit {

  public companyInfo: ICompanyDetailedInfo;
  private routeSub: Subscription;

  constructor(
    private comapnyInfoApi: CompanyInfoService,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    let paramsObsComb = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));

    this.routeSub = paramsObsComb.subscribe(p => {
      this.comapnyInfoApi.getDetailed()
        .subscribe(companyInfo => {
          this.companyInfo = companyInfo;
          this.companyInfo.title = this.companyInfo.title || '';
          this.companyInfo.subTitle = this.companyInfo.subTitle || '';
        });
    });
  }

  public addPartner(): void {
    this.companyInfo.partners.push({
      id: 0,
      name: '',
      description: '',
      imageRef: null
    });
  }

  public addServices(): void {

    this.companyInfo.services.push({
      id: 0,
      name: '',
      description: ''
    });
  }

  public addVacancy(): void {
    this.companyInfo.jobVacancies.push({
      id: 0,
      name: '',
      description: '',
      gender: null
    });
  }

  public removeJobVacancy(id: number): void {
    let index = this.companyInfo.jobVacancies.findIndex(x => x.id === id);
    this.companyInfo.jobVacancies.splice(index, 1);
  }

  public removeService(id: number): void {
    let index = this.companyInfo.services.findIndex(x => x.id === id);
    this.companyInfo.services.splice(index, 1);
  }

  public removePartner(id: number): void {
    let index = this.companyInfo.partners.findIndex(x => x.id === id);
    this.companyInfo.partners.splice(index, 1);
  }

  public submitCompanyInfo(): void {
    this.companyInfo.services = this.companyInfo.services.filter(x => x.name && x.name.trim() !== '');
    this.companyInfo.partners = this.companyInfo.partners.filter(x => x.name && x.name.trim() !== '');
    this.companyInfo.jobVacancies = this.companyInfo.jobVacancies.filter(x => x.name && x.name.trim() !== '');

    this.comapnyInfoApi.submitDetailedInfo(this.companyInfo)
      .subscribe(() => {
        console.log('Successufully submittted');
      });
  }
}
