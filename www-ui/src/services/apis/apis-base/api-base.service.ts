import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IApiBaseService } from './api-base.service.d';

@Injectable()
export class ApiBaseService<TData> implements IApiBaseService<TData> {

  constructor(
    protected http: Http,
    protected relatedRoute: string
  ) { }

  public create(list: TData[]): Observable<void> {
    return this.http.put(`/api/${this.relatedRoute}`, list)
      .map(response => response.json().data);
  }

  public update(list: TData[]): Observable<void> {
    return this.http.post(`/api/${this.relatedRoute}`, list)
      .map(response => response.json().data);
  }
  public delete(id: number): Observable<void> {
    return this.http.delete(`/api/${this.relatedRoute}/${id}`)
      .map(response => response.json().data);
  }

  public getList(): Observable<TData[]> {
    return this.http.get(`/api/${this.relatedRoute}`)
      .map(response => <TData[]>response.json().data);
  }
}
