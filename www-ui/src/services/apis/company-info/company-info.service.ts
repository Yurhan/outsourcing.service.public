import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ICompanyInfo, ICompanyDetailedInfo } from '../../../models';
import { ApiBaseService } from '../apis-base/api-base.service';
import { ICompanyInfoService } from './company-info.service.d';

@Injectable()
export class CompanyInfoService extends ApiBaseService<ICompanyInfo> implements ICompanyInfoService {

  constructor(http: Http) {
    super(http, 'company-info');
  }

  public getInfo(): Observable<ICompanyInfo | undefined> {
    return this.getList().map(list => list[0]);
  }

  public getDetailed(): Observable<ICompanyDetailedInfo> {
    return this.http.get(`/api/${this.relatedRoute}/details`)
      .map(response => response.json().data);
  }

  public submitDetailedInfo(info: ICompanyDetailedInfo): Observable<void> {
    return this.http.post(`/api/${this.relatedRoute}/details`, info)
      .map(() => { });
  }
}
