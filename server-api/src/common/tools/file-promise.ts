
import * as Promise from 'bluebird';
import { injectable } from 'inversify';
import * as fs from 'fs';

export interface IFilePromise {

  createDirIfNotExists(dirPath: string): Promise<void>;
  getFileNames(dirPath: string): Promise<string[]>;
  unLinkFile(path: string): Promise<void>;
  unLinkFiles(pathes: string[]): Promise<void>;

  createFilesIfNotExists(fileInfo: { path: string, data: Buffer }[]): Promise<void>;
}

@injectable()
export class FilePromise implements IFilePromise {

  public createFilesIfNotExists(files: { path: string, data: Buffer }[]): Promise<void> {
    let promises = files.map(file => {
      return new Promise((resolve, reject) => {
        fs.writeFile(file.path, file.data, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      })
    });

    return Promise.all(promises).then(() => { });
  }

  public createDirIfNotExists(dirPath: string): Promise<void> {

    if (!dirPath || dirPath.trim() === '') {
      return Promise.reject(new Error('DirPath is required'));
    }

    return new Promise((resolve, reject) => {
      fs.exists(dirPath, (exists) => {
        if (!exists) {
          fs.mkdir(dirPath, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    })
      .then(() => { });
  }

  public getFileNames(dirPath: string): Promise<string[]> {

    if (!dirPath || dirPath.trim() === '') {
      return Promise.reject(new Error('DirPath is required'));
    }

    return new Promise<string[]>((resolve, reject) => {
      fs.readdir(dirPath, (err, fileNames) => {
        if (err) {
          reject(err);
        } else {
          resolve(fileNames);
        }
      });
    })
  }

  public unLinkFile(path: string): Promise<void> {

    if (!path || path.trim() === '') {
      return Promise.reject(new Error('path is required'));
    }

    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
        return;
      });
    }).then(() => { });
  }

  public unLinkFiles(pathes: string[]): Promise<void> {
    if (!pathes || pathes.length === 0) {
      return Promise.resolve();
    }

    let unLinkFilesPromises = pathes.map(path => this.unLinkFile(path));
    return Promise.all(unLinkFilesPromises).then(() => { });
  }

}
