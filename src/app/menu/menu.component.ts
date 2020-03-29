import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from '../model/MenuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() menuItems: MenuItem[];
  @Output() pathChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {

  }

  onChangePath(item: MenuItem): void {
    console.log('item.path ' + item.path);
    this.pathChange.emit(item.path);
  }

  onSubMenuPath(event: string) {
    this.pathChange.emit(event);
  }
}

