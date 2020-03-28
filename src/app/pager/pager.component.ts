import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input() pageCount$: Observable<number>;

  currentPage = 1;

  @Output() pageChange = new EventEmitter();

  pages: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.pageCount$.subscribe(value => {
      console.log(value);
      this.pages = this.updatePages(value);
    });
  }

  updatePages(pageCount): number[] {
    const array: Array<number> = [];
    for (let i = 1; i <= pageCount; i++) {
      array.push(i);
    }
    return array;
  }

  private onPageClick(event, page) {
    event.preventDefault();
    event.stopPropagation();
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
