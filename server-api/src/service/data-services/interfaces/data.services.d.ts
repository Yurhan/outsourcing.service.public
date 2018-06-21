import * as Promise from 'bluebird';

export interface IDataService<TData> {
  addList(list: TData[]): Promise<void>;
  add(data: TData): Promise<void>;
  updateList(list: TData[]): Promise<void>;
  update(data: TData): Promise<void>;
  upsertList(list: TData[]): Promise<void>;
  upsert(data: TData): Promise<void>;
  deleteList(list: TData[]): Promise<void>;
  deleteAll(): Promise<void>;

  submitList(list: TData[]): Promise<void>;

  getAll(): Promise<TData[]>;
}
