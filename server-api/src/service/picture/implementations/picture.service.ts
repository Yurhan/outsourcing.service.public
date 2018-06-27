import * as Promise from 'bluebird';
import { inject, injectable } from 'inversify';
import { IPicture, IBasePicture } from '../../../models';
import { IPictureService } from '..';
import * as uuid from 'node-uuid';

import { IQueryableProvider } from '../../unit-of-work';

import * as TYPES from '../../../types';
import { IFileStorage } from '../../storage';

@injectable()
export class PictureService implements IPictureService {

  private readonly CONTAINER_NAME = 'user_pictures';

  constructor(
    @inject(TYPES.FILE_STORAGE) private readonly fileStorage: IFileStorage,
    @inject(TYPES.QUERY_PROVIDER) private readonly queryableProvider: IQueryableProvider// ,
    // @inject(Symbol.for('ISqlUserQueryBuilder')) private readonly queryBuilder: ISqlUserQueryBuilder
  ) { }

  public upload(name: string, mimeType: string, content: Buffer): Promise<IBasePicture> {

    let id = uuid.v4();
    let picture: IPicture = {
      id: id,
      name: name,
      mimeType: mimeType,
      content: content,
      pictureAddress: this.getPictureAddress(id)
    }

    return this.addPicture(picture)
      .then(() => this.fileStorage.addFile(this.CONTAINER_NAME, picture.id, content))
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
      .then(() => this.fileStorage.removeFiles(this.CONTAINER_NAME, assignedIds));
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
            content: rec.content,
            pictureAddress: this.getPictureAddress(rec.id)
          }
          return res;
        });
      });
  }

  public copyAllToStorage(): Promise<void> {

    return this.getAll()
      .then(pictures => {
        if (pictures.length > 0) {
          let files = pictures.map(p => ({ identifier: p.id, data: p.content }));
          return this.fileStorage.addFiles(this.CONTAINER_NAME, files);
        }
      })
  }

  public getPictureAddress(id: string): string {
    return this.fileStorage.getFileUrlAddress(this.CONTAINER_NAME, id);
  }

  public getById(id: string): Promise<IPicture> {
    let sqlQuery = `SELECT * FROM "picture" WHERE id =:id`;
    return this.queryableProvider.getQueryable()
      .querySingle(sqlQuery, { id: id })
      .then((res: any) => this.convertDbToPicture(res));
  }

  private convertDbToPicture(rec: any): IPicture {
    return {
      id: rec.id,
      name: rec.name,
      mimeType: rec.mimetype,
      content: rec.content,
      pictureAddress: this.getPictureAddress(rec.id)
    }
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
}
