import { Observable } from 'rxjs/Rx';
import { ICompanyInfo, ICompanyDetailedInfo } from '../../../models';
import { IApiBaseService } from '../apis-base/api-base.service.d';

export interface ICompanyInfoService extends IApiBaseService<ICompanyInfo> {
  getDetailed(): Observable<ICompanyDetailedInfo>;
  submitDetailedInfo(info: ICompanyDetailedInfo): Observable<void>;
}
