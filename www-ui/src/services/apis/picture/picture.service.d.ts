import { Observable } from 'rxjs/Rx';

export interface IPictureService {
  uploadPicture(picture: File): Observable<string>;
}
