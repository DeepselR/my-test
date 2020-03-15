import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Field, FieldData} from "../items/field";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {

  structure: {};

  cardName: string;

  formsData: Map<string, Field[]> = new Map<string, Field[]>();

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    const fields = Array.from<FieldData>(this.structure[this.cardName])
    .filter(value => value.type !== 'object')
    .map(value => this.createField(value));
    this.formsData.set(this.cardName, fields);
  }

  ngOnDestroy(): void {
  }

  private createField(value: FieldData): Field {
    const field = new Field();
    field.name = value.name;
    field.label = value.title;
    field.colSpan = value.nlength;
    field.hidden = value.hidden;
    if (value.type === 'string') {
      if (value.codefilter) {
        field.type = 'select';
        field.codefilter = value.codefilter;
        field.relatedfields = value.relatedfields;
      } else {
        field.inputType = 'text';
        field.type = 'input';
      }
    }
    return field;
  }
}
