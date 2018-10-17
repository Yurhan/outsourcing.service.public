export enum FieldType {
  ShortText = 1,
  LongText = 2,
  Image = 3,
  List = 4
}

export interface IColumnMeta {
  title: string;
  fieldSelector: (field: any) => any;
  type: FieldType;
}
