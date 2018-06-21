import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ICompanyPartner } from '../../../models';
import { ApiBaseService } from '../apis-base/api-base.service';

@Injectable()
export class CompanyPartnerService extends ApiBaseService<ICompanyPartner> {
  constructor(http: Http) {
    super(http, 'company-partner');
  }
}
