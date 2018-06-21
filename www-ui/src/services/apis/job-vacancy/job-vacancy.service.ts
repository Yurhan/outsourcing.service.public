import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IJobVacancy } from '../../../models';
import { ApiBaseService } from '../apis-base/api-base.service';

@Injectable()
export class JobVacancyService extends ApiBaseService<IJobVacancy> {
  constructor(http: Http) {
    super(http, 'job-vacancy');
  }
}
