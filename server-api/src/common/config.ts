import { injectable } from 'inversify';
import 'reflect-metadata';
import * as config from 'config';

export interface IConfig {
  get<T>(setting: string): T;
  has(setting: string): boolean;
}

@injectable()
export class Config implements IConfig {

  public get<T>(setting: string): T {
    if (!config.has(setting)) {
      throw new Error(`Missing config property '${setting}'`);
    }
    return config.get<T>(setting);
  }

  public has(setting: string): boolean {
    return config.has(setting);
  }
}
