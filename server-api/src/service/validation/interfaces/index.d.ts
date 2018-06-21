export interface IBaseTableModelValidator<TData> {
  validateListForAdd(data: TData[], errors?: Array<string>): boolean;
  validateListForUpdate(data: TData[], errors?: Array<string>): boolean;
  validateListForDelete(data: TData[], errors?: Array<string>): boolean;
}
