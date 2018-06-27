import { inject, injectable } from 'inversify';
import * as Promise from 'bluebird';
import { IFileStorage } from '..';

import * as path from 'path';

import * as TYPES from '../../../types';
import { IFilePromise } from '../../../common';

@injectable()
export class LocalStorage implements IFileStorage {


  constructor(
    @inject(TYPES.FILE_PROMISE) private readonly filePromise: IFilePromise
  ) { }

  public addFile(containerName: string, identifier: string, data: Buffer): Promise<void> {
    return this.addFiles(containerName, [{ identifier: identifier, data: data }]);
  }

  public addFiles(containerName: string, files: { identifier: string; data: Buffer; }[]): Promise<void> {
    return this.filePromise.createDirIfNotExists(this.getContainerAddress(containerName))
      .then(() => {
        let localFiles = files.map(f => ({ path: this.getFileAddress(containerName, f.identifier), data: f.data }))
        return this.filePromise.createFilesIfNotExists(localFiles)
      })
  }

  public removeFile(containerName: string, identifier: string): Promise<void> {
    return this.removeFiles(containerName, [identifier]);
  }

  public removeFiles(containerName: string, identifiers: string[]): Promise<void> {

    return this.filePromise.getFileNames(this.getContainerAddress(containerName))
      .then((fileNames) => {
        let pathes = fileNames
          .filter(fName => identifiers.indexOf(fName) < 0)
          .map(fName => this.getFileAddress(containerName, fName));
        return this.filePromise.unLinkFiles(pathes);
      });
  }

  public getFileAddress(containerName: string, identifier: string): string {
    return path.join(this.getContainerAddress(containerName), identifier);
  }

  public getContainerAddress(containerName: string): string {
    return path.join(path.dirname(process.env.INIT_CWD), `\\www-ui\\src\\static\\${containerName}`);
  }

  public getFileUrlAddress(containerName: string, identifier: string): string {
    return `/static/${containerName}/${identifier}`;
  }
}
