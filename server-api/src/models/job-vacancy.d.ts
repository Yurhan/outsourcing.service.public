export type Gender = 'Man' | 'Women';

export interface IJobVacancy {
  id: number;
  name: string;
  description: string;
  gender: Gender
}
