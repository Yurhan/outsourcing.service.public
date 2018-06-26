import * as Promise from 'bluebird';
import { inject, injectable } from 'inversify';
import { IPicture, IBasePicture } from '../../../models';
import { IPictureService } from '..';
import * as path from 'path';
import * as uuid from 'node-uuid';

import { IQueryableProvider } from '../../unit-of-work';

import * as TYPES from '../../../types';
import { IFilePromise } from '../../../common';

@injectable()
export class PictureService implements IPictureService {

  constructor(
    @inject(TYPES.FILE_PROMISE) private readonly filePromise: IFilePromise,
    @inject(TYPES.QUERY_PROVIDER) private readonly queryableProvider: IQueryableProvider// ,
    // @inject(Symbol.for('ISqlUserQueryBuilder')) private readonly queryBuilder: ISqlUserQueryBuilder
  ) { }

  public upload(file: any): Promise<IBasePicture> {

    let picture: IPicture = {
      id: `${uuid.v4()}_${file.name}`,
      name: file.name,
      mimeType: file.mimetype,
      content: file.data
    }

    return this.addPicture(picture)
      .then(() => this.moveFileToStorage(picture.id, file))
      .then(() => {
        delete picture.content;
        return picture;
      });
  }

  public delete(uid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public deleteUnAssigned(assignedIds: string[]): Promise<void> {

    if (!assignedIds || assignedIds.length === 0) {
      console.log('Was here', assignedIds);
      return Promise.resolve();
    }

    return this.deleteUnAssignedRecordsByIds(assignedIds)
      .then(() => this.deleteUnAssignedFiles(assignedIds));
  }

  public getAll(): Promise<IPicture[]> {
    let sqlQuery = 'SELECT * FROM "picture";';
    return this.queryableProvider.getQueryable().query(sqlQuery, {})
      .then((pictureRec) => {
        return pictureRec.map((rec: any) => {
          let res: IPicture = {
            id: rec.id,
            name: rec.name,
            mimeType: rec.mimetype,
            content: rec.content
          }
          return res;
        });
      });
  }

  public copyAllToStorage(): Promise<void> {

    return this.getAll()
      .then(pictures => {
        if (pictures.length > 0) {
          return this.filePromise.createDirIfNotExists(this.getDirAddress())
            .then(() => {
              let files = pictures.map(p => ({ path: this.getFileAddress(p.id), data: p.content }))
              return this.filePromise.createFilesIfNotExists(files)
            })
        }
      })
  }

  private deleteUnAssignedRecordsByIds(ids: string[]): Promise<void> {
    if (!ids || ids.length === 0) {
      console.log('Was here deleteRecordsByIds ', ids);
      return Promise.resolve();
    }

    let params: any = {}
    ids.forEach((id, i) => {
      params[`id_${i}`] = id;
    });

    let sqlQuery = `
      DELETE FROM "picture" 
      WHERE "id" NOT IN (${Object.keys(params).map(key => `:${key}`).join(',')})`;
    return this.queryableProvider.getQueryable().query(sqlQuery, params).then(() => { });
  }

  private deleteUnAssignedFiles(assignedIds: string[]): Promise<void> {
    if (!assignedIds || assignedIds.length === 0) {
      console.log('Was here deleteFiles ', assignedIds);
      return Promise.resolve();
    }

    return this.filePromise.getFileNames(this.getDirAddress())
      .then((fileNames) => {
        let pathes = fileNames
          .filter(fName => assignedIds.indexOf(fName) < 0)
          .map(fName => this.getFileAddress(fName));
        return this.filePromise.unLinkFiles(pathes);
      });
  }

  private addPicture(picture: IPicture): Promise<void> {
    //TODO add picture to db
    let sqlQuery = `INSERT INTO "picture"("id", "name", "mimetype", "content")
      VALUES(:id, :name, :mimeType, :content)`;

    let params = {
      id: picture.id,
      name: picture.name,
      mimeType: picture.mimeType,
      content: picture.content
    }

    return this.queryableProvider.getQueryable().query(sqlQuery, params).then(() => { });
  }

  private getDirAddress(): string {
    return path.join(path.dirname(process.env.INIT_CWD), '\\www-ui\\src\\static\\user_pictures');
  }

  private getFileAddress(fileName: string): string {
    return path.join(this.getDirAddress(), fileName);
  }

  private moveFileToStorage(id: string, file: any): Promise<void> {
    return this.filePromise.createDirIfNotExists(this.getDirAddress())
      .then(() => this.filePromise.moveFile(this.getFileAddress(id), file));
  }
}
