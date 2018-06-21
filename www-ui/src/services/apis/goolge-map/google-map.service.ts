import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IAddress, ILocation, IGoogleMapRI } from '../../../models';
import { IGoogleMapService } from './google-map.service.d';

@Injectable()
export class GoogleMapService implements IGoogleMapService {

  constructor(
    private http: Http
  ) { }

  getApiKey(): Observable<string> {
    return this.http.get(`/configs`)
      .map(response => response.json());
  }

  getLocation(address: IAddress): Observable<ILocation> {
    let searchParam = new URLSearchParams();
    searchParam.append('address', `${address.city} ${address.street}`);
    searchParam.append('key', 'AIzaSyAQQjJp3kcqy5N-MLdmPvPJBHvUa0jtncE');

    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json`, { search: searchParam })
      .map(response => (<IGoogleMapRI>response.json()).result.geometry.location);
  }
}
