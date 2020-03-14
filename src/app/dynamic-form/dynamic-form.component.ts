import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "../items/field";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() fields?: Field[];

  form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.createControl();
  }

  get value() {
    return this.form.value;
  }

  private createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      const control = this.fb.control(
        field.value
      );
      group.addControl(field.name, control);
    });
    return group;

  }

  onSubmit($event: Event) {

  }
}
