import * as Promise from 'bluebird';

export interface IFileStorage {
  addFile(containerName: string, identifier: string, data: Buffer): Promise<void>;
  addFiles(containerName: string, files: { identifier: string, data: Buffer }[]): Promise<void>;
  removeFile(containerName: string, identifier: string): Promise<void>;
  removeFiles(containerName: string, identifiers: string[]): Promise<void>;
  getFileAddress(containerName: string, identifier: string): string;
  getContainerAddress(containerName: string);
  getFileUrlAddress(containerName: string, identifier: string): string;
}