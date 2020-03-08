import { Component, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from '../model/MenuItem';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menuItems: MenuItem[];

  constructor() {}

  ngOnInit(): void {}
}
