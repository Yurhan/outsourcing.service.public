export interface IBasePicture {
  id: string;
  name: string;
  mimeType: string;
}

export interface IPicture extends IBasePicture {
  content: Buffer;
}
