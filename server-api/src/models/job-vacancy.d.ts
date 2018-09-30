export type Gender = 'Man' | 'Woman';

export interface IJobVacancy {
  id: number;
  name: string;
  description: string;
  gender: Gender;

  descriptionRecords?: IJobVacancyDescriptionRecord[];
}

export type DescriptionType = 'Requirements' | 'Responsibilities'

export interface IJobVacancyDescriptionRecord {
  id: number;
  jobVacancyId: number;
  type: DescriptionType;
  description: string;
}