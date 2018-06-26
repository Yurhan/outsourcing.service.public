import {
  ITableInfo,
  IFieldInfo
} from '../interfaces';

type getValueFunc<TableModel> = (record: TableModel) => number | string | boolean | Date | Buffer | null | undefined;

type Field<TableModel> = {
  uid?: boolean;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  valueFunc: getValueFunc<TableModel>;
}

interface IFieldMapping<TableModel> {
  [key: string]: Field<TableModel> | getValueFunc<TableModel>;
};

export function table<TModel>(name: string, fieldMapping: IFieldMapping<TModel>): Function {

  let keys = Object.getOwnPropertyNames(fieldMapping);

  let tableInfo: ITableInfo<TModel> = {
    tableName: name,
    fields: keys.map(key => {

      let fieldItem = <Field<TModel>>fieldMapping[key];
      let field: IFieldInfo<TModel> = {
        isPrimaryKey: fieldItem.primaryKey === true,
        name: key,
        uid: fieldItem.uid === true,
        autoIncrement: fieldItem.autoIncrement === true,
        getValue: fieldItem.valueFunc ? fieldItem.valueFunc : <getValueFunc<TModel>>fieldMapping[key]
      };
      return field;
    })
  };

  return function <T extends { new(...args: any[]): {} }>(constructor: T): T {

    constructor.prototype.tableInfo = tableInfo;
    return constructor;
  };
};
