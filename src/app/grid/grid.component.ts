import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../service/rest.service';
import { ListGridRecord } from '../model/ListGridRecord';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() name$: Observable<string>;

  structure: [];
  fieldsMap: Map<string, {}>;
  data: ListGridRecord[];
  private selectedRecord: ListGridRecord;
  cardName: string;

  constructor(
    private restService: RestService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.name$.subscribe(name => {
      if (name) {
        this.restService.getStructure(name).subscribe(structure => {
          this.structure = structure[name];
          this.fieldsMap = this.createFieldsMap();
          this.restService
            .getPostTableData(name, {
              min: 1,
              max: 25
            })
            .subscribe(data => {
              if (data) {
                this.data = this.convertToRecords(data);
              }
            });
        });
      }
    });
  }

  private createFieldsMap(): Map<string, {}> {
    const map: Map<string, {}> = new Map<string, {}>();
    this.structure.forEach(value => {
      map.set(value['name'], value);
    });
    this.cardName = map.get('root')['cardname'];
    return map;
  }

  private convertToRecords(data) {
    const array: ListGridRecord[] = new Array<ListGridRecord>();
    data.map(value => {
      const record = new ListGridRecord();
      const strings = Object.keys(value);
      strings.forEach(key => {
        record.setAttribute(key, value[key]);
      });
      array.push(record);
    });
    return array;
  }

  selectRecord(record: ListGridRecord): void {
    this.selectedRecord = record;
  }

  onDoubleClick(): void {
    console.log(this.selectedRecord);
    let modalRef = this.modalService.open(PopupComponent, { centered: true , size: 'lg'});
    modalRef.componentInstance.structureName = this.cardName;
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
