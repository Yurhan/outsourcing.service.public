import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ICompanyServices } from '../../../models';
import { ApiBaseService } from '../apis-base/api-base.service';

@Injectable()
export class CompanyServicesService extends ApiBaseService<ICompanyServices> {
  constructor(http: Http) {
    super(http, 'company-services');
  }
}
