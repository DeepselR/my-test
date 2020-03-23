import { Component, OnInit } from '@angular/core';
import { Field } from '../field';
import { FormGroup } from '@angular/forms';
import { RestService } from '../../service/rest.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  field: Field;
  group: FormGroup;

  objects: {}[];
  private map: Map<string, string>;

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.map = this.createRelatedFieldMap();
    console.log(this.map);
    this.restService
      .postData(this.field.codefilter + 't', { min: 1, max: -1 })
      .subscribe(value => {
        this.objects = value[this.field.codefilter + 't'];
        console.log(this.objects);
      });
  }

  getStructureFieldHidden(field: {}): boolean {
    return field['hidden'];
  }

  private createRelatedFieldMap(): Map<string, string> {
    const relatedFieldMap = new Map<string, string>();
    this.field.relatedfields
      .toLocaleLowerCase()
      .split(',')
      .forEach(value => {
        const strings = value.split('-');
        relatedFieldMap.set(strings[0], strings[1]);
      });
    return relatedFieldMap;
  }

  getRelatedValue(index: number) {
    return Array.from(this.map.values())[index];
  }

  setRelated(value: string) {
    const codeField = this.getRelatedValue(0);
    const selected = this.objects.find(object => object[codeField] == value);
    console.log(selected);
    if (selected) {
      this.map.forEach((rkey: string, key: string) => {
        this.group.patchValue({ [key]: selected[rkey] });
      });
    }
  }
}
