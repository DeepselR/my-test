import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  structureName: string;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.structureName);
  }

}
