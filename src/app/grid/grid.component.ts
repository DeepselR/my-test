import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {RestService} from '../service/rest.service';
import {ListGridRecord} from '../model/ListGridRecord';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupComponent} from '../popup/popup.component';
import {Field} from '../items/field';
import {SearchForm} from '../model/SearchForm';
import {GridSettings} from '../model/GridSettings';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() gridSettings$: Observable<GridSettings>;
  structure: Field[];
  fieldsMap: Map<string, Field>;
  data: ListGridRecord[];
  private selectedRecord: ListGridRecord;
  cardName: string;
  @ViewChild('divElement') divElement: ElementRef;
  private tableName: string;
  private pagesCount$: Subject<number> = new Subject<number>();
  private title: string;


  constructor(
    private restService: RestService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.gridSettings$.subscribe(settings => {
      if (settings.name !== this.tableName) {
        this.tableName = settings.name;
        this.loadStructure();
      }
      console.log(settings.title);
      this.title = settings.title;
    });
  }

  private loadStructure(): void {
    this.restService.getStructure(this.tableName).subscribe(structure => {
      if (structure) {
        this.structure = structure[this.tableName];
        this.fieldsMap = this.createFieldsMap();
        this.loadTableData(new SearchForm(1, 25));
        this.countTableData();
      }
    });
  }

  private loadTableData(searchForm: SearchForm): void {
    this.restService
    .getPostTableData(this.tableName, searchForm)
    .subscribe(data => {
      if (data) {
        this.data = this.convertToRecords(data);
      }
      this.updateHeight();
    });
  }

  private countTableData(): void {
    this.restService.count(this.tableName).subscribe(value => {
      this.pagesCount$.next(Math.ceil(value / 25));
    });
  }

  private createFieldsMap(): Map<string, Field> {
    const map: Map<string, Field> = new Map<string, Field>();
    if (this.structure) {
      this.structure.forEach(value => {
        map.set(value.name, value);
      });
      this.cardName = map.get('root').cardname;
    }
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
    this.restService.getStructure(this.cardName).subscribe(value => {
      const modalRef = this.modalService.open(PopupComponent, {
        centered: true,
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });
      modalRef.componentInstance.structure = value;
      modalRef.componentInstance.cardName = this.cardName;
    });

  }

  getStructureFieldHidden(attribute: string): boolean {
    if (attribute === 'root') {
      return true;
    }
    if (this.fieldsMap && this.fieldsMap.get(attribute)) {
      return this.fieldsMap.get(attribute).hidden;
    }
    return false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateHeight();
  }

  private updateHeight(): void {
    this.divElement.nativeElement.style.height = (window.innerHeight - 135) + 'px';
  }

  private reload(event) {
    console.log(event);
    const max = event * 25;
    const min = max - 24;
    this.loadTableData(new SearchForm(min, max));
  }
}
