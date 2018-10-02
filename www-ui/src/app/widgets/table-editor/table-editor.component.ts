import { Component, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CompanyInfoService,
  PictureService
} from '../../../services/apis';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

import * as _ from 'lodash';
import { ICompanyInfo } from '../../../models';

@Component({
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})

export class TableEditorComponent implements AfterViewInit {

  public editingRecord: any

  public isEditing = false;

  @Input() title: string;
  @Input() noOverlay: boolean;
  @Input() isCall: boolean;

  @Input() public list: Array<any>;


  @Output() public delete = new EventEmitter<void>(false);
  @Output() public submit = new EventEmitter<void>(false);
  @Output() public cancle = new EventEmitter<void>(false);

  constructor(
  ) { }

  public ngAfterViewInit(): void {

  }

  public addNewRecord(): void {

  }

  public editRecord(id: number): void {
    this.isEditing = true;
  }

  public deleteRecord(id: number): void {
    this.delete.emit(<any>id);
  }

  public save(): void {
    this.submit.emit(<any>this.editingRecord);
    this.isEditing = false;
  }
}
