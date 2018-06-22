import { Observable } from 'rxjs/Rx';
import {
  IAddress,
  ILocation
} from '../../../models';

export interface IGoogleMapService {
  getApiKey(): Observable<string>;
  getLocation(address: IAddress): Observable<ILocation>;
}
