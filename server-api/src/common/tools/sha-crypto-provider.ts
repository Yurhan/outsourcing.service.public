import { injectable, inject } from 'inversify';
import * as TYPES from '../../types';

export interface IFastSHA256 {
  hash: (message: Uint8Array) => Uint8Array;
}

export interface ISHACryptoProvider {
  computeHash(message: string, salt?: string): Buffer;
  isEquelHash(hash: Buffer, message: string, salt?: string, ): boolean;
  generateSalt(): string;
}

@injectable()
export class SHACryptoProvider implements ISHACryptoProvider {

  constructor(
    @inject(TYPES.FAST_SHA256) private readonly fastSHA256: IFastSHA256
  ) { }

  public computeHash(message: string, salt?: string): Buffer {
    let uintArray = new Uint8Array(Buffer.from(message, 'utf-8'));
    let hash = this.fastSHA256.hash(uintArray);
    return new Buffer(hash.buffer);
  }

  public isEquelHash(hash: Buffer, message: string, salt?: string): boolean {
    return hash.compare(this.computeHash(message, salt)) === 0;
  }

  public generateSalt(): string {
    throw new Error('Method not implemented.');
  }
}