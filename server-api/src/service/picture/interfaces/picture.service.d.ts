import * as Promise from 'bluebird';
import { IPicture, IBasePicture } from '../../../models';

export interface IPictureService {
  upload(file: any): Promise<IBasePicture>;
  delete(uid: string): Promise<void>;
  getAll(): Promise<IPicture[]>;
  deleteUnAssigned(assignedids: string[]): Promise<void>;
  copyAllToStorage(): Promise<void>;
}
