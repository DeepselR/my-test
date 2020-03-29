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

  private pageSize: number;

  constructor() {
  }

  ngOnInit(): void {
    this.pageCount$.subscribe(value => {
      console.log(value);
      this.pages = this.updatePages(value);
    });
  }

  updatePages(pageCount): number[] {
    console.log('updatePages ' + pageCount);
    this.pageSize = pageCount;
    const array: Array<number> = [];
    if (pageCount === 1) {
      array.push(pageCount);
      return array;
    }

    if (this.currentPage === 1) {
      const max = pageCount >= 3 ? 3 : pageCount;
      for (let i = 1; i <= max; i++) {
        array.push(i);
      }
    }
    if (this.currentPage > 1 && this.currentPage < pageCount) {
      array.push(this.currentPage - 1);
      array.push(this.currentPage);
      array.push(this.currentPage + 1);
    }

    if (this.currentPage === pageCount && pageCount > 3) {
      array.push(this.currentPage - 2);
      array.push(this.currentPage - 1);
      array.push(this.currentPage);
    }

    if (this.currentPage === pageCount && pageCount < 3) {
      for (let i = pageCount; i > 0; i--) {
        array.unshift(i);
      }
    }

    return array;
  }

  private onPageClick(event, page) {
    event.preventDefault();
    event.stopPropagation();
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
    this.pages = this.updatePages(this.pageSize);
  }

  private onNextClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.currentPage = this.currentPage + 1;
    this.pageChange.emit(this.currentPage);
    this.pages = this.updatePages(this.pageSize);
  }

  private onPreviousClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.currentPage = this.currentPage - 1;
    this.pageChange.emit(this.currentPage);
    this.pages = this.updatePages(this.pageSize);
  }
}
