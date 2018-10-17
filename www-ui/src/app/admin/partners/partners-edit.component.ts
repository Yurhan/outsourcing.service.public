import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CompanyPartnerService // ,
  // PictureService
} from '../../../services/apis';
import { Observable } from 'rxjs';

import { IColumnMeta, FieldType } from '../../widgets';

import { ICompanyPartner } from '../../../models';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class PatnerEditComponent implements AfterViewInit {

  public partners: ICompanyPartner[];

  public columnsMeta: IColumnMeta[] = [{
    title: 'Індентифікатор',
    fieldSelector: (field: ICompanyPartner) => field.id,
    type: FieldType.ShortText
  }, {
    title: 'Назва',
    fieldSelector: (field: ICompanyPartner) => field.name,
    type: FieldType.ShortText
  }, {
    title: 'Опис',
    fieldSelector: (field: ICompanyPartner) => field.description,
    type: FieldType.LongText
  }, {
    title: 'Картинка',
    fieldSelector: (field: ICompanyPartner) => field.imageRef,
    type: FieldType.Image
  }];

  constructor(
    private partnerService: CompanyPartnerService,
    // private pictureService: PictureService,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    let paramsObsComb = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));

    paramsObsComb.subscribe(p => {
      this.partnerService.getList()
        .subscribe(partners => {
          this.partners = partners;
        });
    });
  }

  public onDelete(event: any): void {
    console.log('onDelete is invoked');
  }

  public onSubmit(event: any): void {
    console.log('onSubmit is invoked');
  }

  public onCancle(event: any): void {
    console.log('onCancle is invoked');
  }

  public submit(partner: ICompanyPartner): void {
    let obs = this.partnerService.submitOne(partner);
    obs.subscribe(() => {
      console.log('Successufully submittted');
    });
  }
}
