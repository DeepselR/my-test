import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() structure$: Observable<{}>;

  @Input() structureName: string;

  private structure: {};

  fieldsMap: Map<string, {}> = new Map();

  fields: {}[] = [];

  constructor() {}

  ngOnInit(): void {
    this.structure$.subscribe(structure => {
      this.structure = structure;
      this.fillMetaData();
    });
  }

  fillMetaData(): void {
    this.fieldsMap = this.createFieldsMap();
    console.log(this.fieldsMap);
  }

  createFieldsMap(): Map<string, {}> {
    const map: Map<string, {}> = new Map<string, {}>();
    this.structure[this.structureName].forEach(value => {
      map.set(value['name'], value);
      this.fields.push(value);
    });
    return map;
  }


  getStructureFieldHidden(attribute: string): boolean {
    if (
      this.fieldsMap &&
      this.fieldsMap.size > 0 &&
      this.fieldsMap.get(attribute)
    ) {
      return this.fieldsMap.get(attribute)['hidden'];
    }
    return false;
  }
}
