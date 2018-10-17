import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IContact } from '../../../models';
import { ApiBaseService } from '../apis-base/api-base.service';

@Injectable()
export class ContactService extends ApiBaseService<IContact> {
  constructor(http: Http) {
    super(http, 'contact');
  }
}
