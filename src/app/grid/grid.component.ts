import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RestService} from "../service/rest.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() name$: Observable<string>;
  structure: [];
  data: [];

  constructor(private restService: RestService) {
  }

  ngOnInit(): void {
    this.name$.subscribe(name => {
      if (name) {
        this.restService.getStructure(name).subscribe(structure => {
          this.structure = structure[name];
          this.restService.getPostTableData(name, {
            min: 1,
            max: 25
          }).subscribe(data => {
            this.data = data[name];
          });
        });
      }
    });
  }

}
