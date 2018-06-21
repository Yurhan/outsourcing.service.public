import { injectable, unmanaged } from 'inversify';
import * as fs from 'fs';

import {
  ISqlTableQueryBuilder,
  IQueryValueEscaper,
  ISqlQuery,
  ITableInfo,
  IFieldInfo
} from '../interfaces';

import * as _ from 'lodash';
import { config } from 'bluebird';

@injectable()
export class SqlTableQueryBuilder<TableModel> implements ISqlTableQueryBuilder<TableModel> {

  protected tableInfo: ITableInfo<TableModel>;

  constructor(
    @unmanaged() protected readonly queryValueEscaper: IQueryValueEscaper
  ) { }

  public buildInsertRecordsQuery(records: TableModel[]): string {

    let sqlBuilder: string[] = [];
    let query: string;

    if (!records.length) {
      throw new Error('Can\'t build insert records query. No records was provided');
    }

    sqlBuilder.push(`INSERT INTO "${this.tableInfo.tableName.toLowerCase()}"(`);
    sqlBuilder.push(this.getColumns(false, true).map(c => `"${c}"`).join(','));
    sqlBuilder.push(`) VALUES`);

    let valuesQuery: string[] = records.map(rec => {
      let values: string[] = this.getValues(rec, false, true);
      return `(${values.join(',')})`;
    });

    sqlBuilder.push(valuesQuery.join(','));
    sqlBuilder.push(';');

    query = sqlBuilder.join('');

    return query;
  }

  public buildUpdateRecordQuery(record: TableModel): string {
    let sqlBuilder: string[] = [];
    let params: any = {};
    let query: string;
    if (!record) {
      throw new Error('Can\'t build update record query. Record data is empty');
    }

    sqlBuilder.push(`UPDATE ${this.tableInfo.tableName.toLowerCase()} `);
    sqlBuilder.push(`SET `);

    let setAttributtesQuery: string[] = this.getFields().map(f => {
      let value = this.escapeValue(f, record);
      return `${f.name}=${value}`;
    });

    sqlBuilder.push(setAttributtesQuery.join(','));
    let primaryKeyField = this.getPrimaryKeyField();

    sqlBuilder.push(' WHERE ');
    sqlBuilder.push(`${primaryKeyField.name}=${this.escapeValue(primaryKeyField, record)};`);

    query = sqlBuilder.join('');
    return query;
  }

  public buildUpsertRecordsQuery(records: TableModel[]): string {
    let sqlBuilder: string[] = [];
    let params: any = {};
    let query: string;

    if (records.length === 0) {
      throw new Error('Can\'t build upsert records query. No records was provided');
    }

    sqlBuilder.push(`INSERT INTO ${this.tableInfo.tableName}(`);
    sqlBuilder.push(this.getColumns(false, true).join(','));
    sqlBuilder.push(`) VALUES`);

    let valuesQuery: string[] = records.map(rec => {
      let values: string[] = this.getValues(rec, false, true);
      return `(${values.join(',')})`;
    });

    sqlBuilder.push(valuesQuery.join(','));

    sqlBuilder.push(` ON DUPLICATE KEY UPDATE `);

    let setAttributtesQuery: string[] = this.getFields().map(f => {
      return `${f.name}=VALUES(${f.name})`;
    });

    sqlBuilder.push(setAttributtesQuery.join(','));
    sqlBuilder.push(';');

    query = sqlBuilder.join('');
    return query;
  }

  public buildDeleteRecordsQuery(records: TableModel[]): string {
    let sqlBuilder: string[] = [];
    let query: string;

    if (records.length === 0) {
      throw new Error('Can\'t build delete records query. No records was provided');
    }

    sqlBuilder.push(`DELETE FROM ${this.tableInfo.tableName.toLowerCase()}`);

    //BUILD INNER QUERY
    let pkField = this.getPrimaryKeyField();
    let values: string[] = records.map(rec => {
      return this.escapeValue(pkField, rec);
    });

    sqlBuilder.push(` WHERE ${pkField.name} IN (${values.join(',')});`);

    query = sqlBuilder.join('');

    return query;
  }

  public buildDeleteAllRecordsQuery(): string {
    return `DELETE FROM "${this.tableInfo.tableName.toLowerCase()}"`;
  }

  public buildSelectManyQuery(): string {
    let sqlBuilder: string[] = [];
    let query: string;

    return `SELECT * FROM "${this.tableInfo.tableName.toLowerCase()}"`;
  }

  protected getColumns(excludePrimaryKey?: boolean, excludeAutoIncrement?: boolean): string[] {
    return this.getFields(excludePrimaryKey, excludeAutoIncrement).map(rec => rec.name);
  }

  protected getValues(rec: TableModel, excludePrimaryKey?: boolean, excludeAutoIncrement?: boolean): string[] {
    let fields = this.getFields(excludePrimaryKey, excludeAutoIncrement);
    return fields.map(f => this.escapeValue(f, rec));
  }

  protected getFields(excludePrimaryKey?: boolean, excludeAutoIncrement?: boolean): IFieldInfo<TableModel>[] {
    let fields = this.tableInfo.fields;
    if (excludePrimaryKey) {
      fields = fields.filter(f => !f.isPrimaryKey);
    }

    if (excludeAutoIncrement) {
      fields = fields.filter(f => !f.autoIncrement);
    }
    return fields;
  }

  protected getPrimaryKeyField(): IFieldInfo<TableModel> {
    let fields = this.tableInfo.fields.filter(r => r.isPrimaryKey);
    if (fields.length === 0) {
      throw new Error('There no primary key in this table');
    }
    return fields[0];
  }

  protected escapeValue(field: IFieldInfo<TableModel>, rec: TableModel): string {
    let value = field.getValue(rec);
    if (field.uid === true && value) {
      value = value.toString().replace(/-/g, '');
      let res = this.queryValueEscaper.escape(value);
      return `UNHEX(${res})`;
    }
    if (typeof value == 'string') {
      value = `'${value}'`;
    }
    return this.queryValueEscaper.escape(value);
  }
}
