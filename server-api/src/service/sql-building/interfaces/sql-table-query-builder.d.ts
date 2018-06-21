export interface ISqlTableQueryBuilder<TableModel> {
  buildInsertRecordsQuery(records: TableModel[]): string;
  buildUpdateRecordQuery(record: TableModel): string;
  buildUpsertRecordsQuery(records: TableModel[]): string;
  buildDeleteRecordsQuery(records: TableModel[]): string;
  buildDeleteAllRecordsQuery(): string;
  buildSelectManyQuery(): string;
}

export interface IFieldInfo<TableModel> {
  isPrimaryKey?: boolean;
  autoIncrement?: boolean;
  uid?: boolean;
  name: string;
  getValue: (rec: TableModel) => string | number | boolean | Date | null | undefined;
}

export interface ITableInfo<TableModel> {
  tableName: string;
  fields: IFieldInfo<TableModel>[];
}
