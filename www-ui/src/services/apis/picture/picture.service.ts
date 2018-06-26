import { IPictureService } from './picture.service.d';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PictureService implements IPictureService {

  constructor(
    private readonly http: Http
  ) { }

  public uploadPicture(picture: File): Observable<string> {
    let formData: FormData = new FormData();
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    formData.append('upload', picture, picture.name);
    return this.http.post('/api/picture', formData, { withCredentials: true, headers: headers })
      .map(res => res.text());
  }
}
