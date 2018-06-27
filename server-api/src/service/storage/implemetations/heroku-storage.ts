import { inject, injectable } from 'inversify';
import * as Promise from 'bluebird';
import { IFileStorage } from '..';

import * as path from 'path';

@injectable()
export class HerokuStorage implements IFileStorage {


  constructor(
  ) { }

  public addFile(containerName: string, identifier: string, data: Buffer): Promise<void> {
    return this.addFiles(containerName, [{ identifier: identifier, data: data }]);
  }

  public addFiles(containerName: string, files: { identifier: string; data: Buffer; }[]): Promise<void> {
    return Promise.resolve();
  }

  public removeFile(containerName: string, identifier: string): Promise<void> {
    return this.removeFiles(containerName, [identifier]);
  }

  public removeFiles(containerName: string, identifiers: string[]): Promise<void> {
    return Promise.resolve();
  }

  public getFileAddress(containerName: string, identifier: string): string {
    return `/api/picture/${identifier}`;
    // return path.join(this.getContainerAddress(containerName), identifier);
  }

  public getContainerAddress(containerName: string): string {
    return '';
    // return path.join(path.dirname(process.env.INIT_CWD), `\\www-ui\\src\\static\\${containerName}`);
  }

  public getFileUrlAddress(containerName: string, identifier: string): string {
    return `/api/picture/${identifier}`;
  }
}
