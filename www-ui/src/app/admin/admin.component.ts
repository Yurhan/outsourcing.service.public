import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CompanyInfoService,
  PictureService
} from '../../services/apis';
import { ICompanyDetailedInfo, ICompanyPartner } from '../../models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

import * as _ from 'lodash';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements AfterViewInit {

  public companyInfo: ICompanyDetailedInfo;
  private routeSub: Subscription;

  constructor(
    private comapnyInfoApi: CompanyInfoService,
    private pictureService: PictureService,
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

          if (!this.companyInfo.contact) {
            this.companyInfo.contact = <any>{
              id: 0,
              primaryPhone: '',
              mobPhones: []
            };
          }

          if (!this.companyInfo.contact.address) {
            this.companyInfo.contact.address = {
              city: '',
              street: ''
            };
          }

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

  public addMobNumber(): void {
    this.companyInfo.contact.mobPhones.push('');
  }

  public removeMobNumber(mobNumber: string): void {
    let index = this.companyInfo.contact.mobPhones.indexOf(mobNumber);
    console.log('index', index);
    this.companyInfo.contact.mobPhones.splice(index, 1);
    console.log(this.companyInfo.contact.mobPhones);
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

  public customTrackBy(index: number, obj: any): any {
    return index;
  }

  public pictureChange(event, partner: ICompanyPartner): void {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.pictureService.uploadPicture(fileList[0])
        .subscribe(picture => {
          console.log('Upload Successed');
          console.log(picture);
          partner.imageRef = picture.id;
          partner.imageAddress = picture.pictureAddress;
        });
    }
  }

  public submitCompanyInfo(): void {
    this.companyInfo.services = this.companyInfo.services.filter(x => x.name && x.name.trim() !== '');
    this.companyInfo.partners = this.companyInfo.partners.filter(x => x.name && x.name.trim() !== '');
    this.companyInfo.jobVacancies = this.companyInfo.jobVacancies.filter(x => x.name && x.name.trim() !== '');
    this.companyInfo.contact.mobPhones = _.uniq(this.companyInfo.contact.mobPhones.filter(x => x && x.trim() !== ''));

    this.comapnyInfoApi.submitDetailedInfo(this.companyInfo)
      .subscribe(() => {
        console.log('Successufully submittted');
      });
  }
}
