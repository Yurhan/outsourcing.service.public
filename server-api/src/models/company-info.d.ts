export interface ICompanyInfo {
  id: number;
  title: string;
  subTitle: string;
}

import {
  ICompanyPartner,
  ICompanyServices,
  IJobVacancy,
  IContact
} from '.';
import { IBasePicture } from './picture';

export interface ICompanyDetailedInfo extends ICompanyInfo {
  partners: ICompanyPartner[];
  jobVacancies: IJobVacancy[];
  services: ICompanyServices[];
  contact: IContact,
  pictures: IBasePicture[]
}
