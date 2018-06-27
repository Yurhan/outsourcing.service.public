import * as Promise from 'bluebird';
import { IPicture, IBasePicture } from '../../../models';

export interface IPictureService {
  upload(name: string, mimeType: string, content: Buffer): Promise<IBasePicture>;
  delete(uid: string): Promise<void>;
  getAll(): Promise<IPicture[]>;
  deleteUnAssigned(assignedids: string[]): Promise<void>;
  copyAllToStorage(): Promise<void>;
  getPictureAddress(id: string): string;
  getById(id: string): Promise<IPicture>;
}
