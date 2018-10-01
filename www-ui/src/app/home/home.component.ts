import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfoService } from '../../services/apis';
import { ICompanyDetailedInfo, ICompanyServices } from '../../models';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { IContact } from '../../models/contact';

import { DescriptionType, Gender, IJobVacancy } from '../../models/job-vacancy';


function groupeBy<T, K>(list: T[], groupeBySelector: (key: T) => K): { key: K, values: T[] }[] {

  let res: any[] = [];

  list.forEach(x => {
    let key: any = groupeBySelector(x);
    let item = res.find(y => y.key === key);
    if (!item) {
      item = { key: key, values: [] };
      res.push(item);
    }
    item.values.push(x);
  });

  console.log('Grouped');
  console.log(res);

  return res;
}

const GenderMap = {
  'Man': 'Вакансії для чоловіків',
  'Woman': 'Вакансії для жінок'
};

const DescriptionMap = {
  'Requirements': 'Основні вимоги',
  'Responsibilities': `Обов'язки`
};

interface IGroupedJobVcancies {
  title: string;
  gender: Gender;
  vacancies: {
    name: string;
    groupedDescription?: IGroupedDescription[];
  }[];
}

interface IGroupedDescription {
  title: string;
  type: DescriptionType;
  descriptionRecords: string[];
}

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  public companyInfo: ICompanyDetailedInfo;
  public contact: IContact;
  private routeSub: Subscription;
  public groupedVacancies: IGroupedJobVcancies[];

  public about = {
    description: `
    Наші компанії представлені на ринку аутсорсингових та рекрутингових послуг починаючи
    з 2004 року. З того часу, серед наших партнерів, були (або є) такі підприємства:
      *  ПАТ Світоч,
      *  ТзОВ Нестле-Україна,
      *  ТОВ ТВК Перша Приватна Броварня,
      *  ПрАТ ВолиньХолддинг (Торчин-продукт),
      *  ТзОВ Kabel Werk Львів, ПрАТ Карлсбертг Україна (Львівська Пивоварня),
      *  ТОВ Кондитерська фабрика «Ярич», ТОВ Castrol Україна,
      *  ВАТ Радехівський цукровий завод та ін.`,
    imageAddress: '/static/about.jpg'
  };

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
          this.contact = this.companyInfo.contact;
          console.log('HERE');
          this.groupedVacancies = this.groupeVacancies(this.companyInfo.jobVacancies);
          console.log(this.groupedVacancies);
        });
    });
  }



  public formatPhoneNumbers(phones: string[]): string {
    if (phones && phones.length > 0) {
      return phones.join(', ');
    }
    return '';
  }

  public getServiceImgAddress(service: ICompanyServices): string {
    const serviceIndex = this.companyInfo.services.findIndex(s => s.id === service.id);
    return `/static/service_${serviceIndex + 1}.jpg`;
  }

  public showMobPhones(): boolean {
    return this.contact && this.contact.mobPhones && this.contact.mobPhones.length > 0;
  }

  private groupeVacancies(jobVacancies: IJobVacancy[]): IGroupedJobVcancies[] {
    if (jobVacancies) {

      return groupeBy(jobVacancies, x => x.gender)
        .map(x => ({
          gender: x.key,
          title: GenderMap[x.key],
          vacancies: x.values.map(v => ({
            name: v.name,
            groupedDescription: groupeBy(v.descriptionRecords, rec => rec.type)
              .map(rec => ({
                title: DescriptionMap[rec.key],
                type: rec.key,
                descriptionRecords: rec.values.map(r => r.description)
              }))
          }))
        }));
    }
    return [];
  }
}
