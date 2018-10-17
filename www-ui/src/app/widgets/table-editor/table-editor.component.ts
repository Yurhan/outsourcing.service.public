import { Component, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';

import { IColumnMeta, FieldType } from '../models';

@Component({
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss']
})

export class TableEditorComponent implements AfterViewInit {

  public editingRecord: any

  public isEditing = false;

  @Input() title: string;

  @Input() public list: Array<any>;
  @Input() public columnsMeta: IColumnMeta[];

  // @Output() public load = new EventEmitter<void>(false);
  @Output() public delete = new EventEmitter<void>(false);
  @Output() public submit = new EventEmitter<void>(false);
  @Output() public cancle = new EventEmitter<void>(false);

  constructor(
  ) { }

  public ngAfterViewInit(): void {
    // this.load.next();
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

  public isShortText(column: IColumnMeta): boolean {
    return column.type === FieldType.ShortText;
  }
  public isLongText(column: IColumnMeta): boolean {
    return column.type === FieldType.LongText;
  }
  public isImage(column: IColumnMeta): boolean {
    return column.type === FieldType.Image;
  }
  public isList(column: IColumnMeta): boolean {
    return column.type === FieldType.List;
  }
}
