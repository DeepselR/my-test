import { Component, OnInit } from '@angular/core';
import { Field } from '../field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  field: Field;
  group: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  getStructureFieldHidden(field: {}): boolean {
    return field['hidden'];
  }

}
