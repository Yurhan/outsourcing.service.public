import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ContactService
} from '../../../services/apis';
import { Observable } from 'rxjs';

import { IContact } from '../../../models';

@Component({
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})

export class ContactEditComponent implements AfterViewInit {

  public contact: IContact;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) { }

  public ngAfterViewInit(): void {
    let paramsObsComb = Observable.combineLatest(this.route.params, this.route.queryParams, (params, qparams) => ({ params, qparams }));

    paramsObsComb.subscribe(p => {
      this.contactService.getOne()
        .subscribe(contact => {
          this.contact = contact;
        });
    });
  }


  public submit(): void {

    this.contactService.submitOne(this.contact)
      .subscribe(() => {
        console.log('Successufully submittted');
      });

  }
}
