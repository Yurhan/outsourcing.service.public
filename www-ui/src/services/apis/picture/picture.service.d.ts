import { Observable } from 'rxjs/Rx';

import { IBasePicture } from '../../../models';

export interface IPictureService {
  uploadPicture(picture: File): Observable<IBasePicture>;
}
