import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobVacancyService } from '../../../services/apis';
import { Observable } from 'rxjs';

import { IJobVacancy } from '../../../models';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class JobVacancyEditComponent implements AfterViewInit {

  public jobVacancies: IJobVacancy[];

  constructor(
    private jobVacancyService: JobVacancyService,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    let paramsObsComb = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));

    paramsObsComb.subscribe(p => {
      this.jobVacancyService.getList()
        .subscribe(jobVacancies => {
          this.jobVacancies = jobVacancies;
        });
    });
  }

  public submit(jobVacancy: IJobVacancy): void {
    let obs = this.jobVacancyService.submitOne(jobVacancy);
    obs.subscribe(() => {
      console.log('Successufully submittted');
    });
  }
}
