import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFunct} from '../model/IFunct';
import {MenuItem} from '../model/MenuItem';
import {RestService} from '../service/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GridSettings} from "../model/GridSettings";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[];

  private sub;
  gridSettings$: BehaviorSubject<GridSettings> = new BehaviorSubject<GridSettings>(new GridSettings());

  constructor(
    private restService: RestService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.sub = this.restService
    .getTableData<IFunct>('ifunct')
    .subscribe(value => {
      this.buildMenu(value);
    });

    this.activeRoute.queryParamMap.subscribe(params => {
      this.reloadGridData(params);
    });
  }

  private reloadGridData(params: ParamMap) {
    const settings = this.gridSettings$.getValue();
    settings.name = params.get('name');
    this.gridSettings$.next(settings);
  }

  private buildMenu(menuFunc: IFunct[]) {
    this.menuItems = menuFunc.map(value => this.createMenuItem(value));
    const map: Map<string, MenuItem[]> = new Map();
    for (const item of this.menuItems) {
      if (item.parentId) {
        if (map.get(item.parentId)) {
          map.get(item.parentId).push(item);
        } else {
          const array = [];
          array.push(item);
          map.set(item.parentId, array);
        }
      }
    }

    this.menuItems.forEach(menuItem => {
      if (map.get(menuItem.id)) {
        menuItem.childs = map.get(menuItem.id);
      }
    });
    this.menuItems = this.menuItems.filter(value => value.parentId == '');
  }

  private createMenuItem(data: IFunct): MenuItem {
    const menuItem = new MenuItem();
    menuItem.id = data.npk;
    menuItem.name = data.vname;
    menuItem.parentId = data.nparent;
    menuItem.class = data.vformclass;
    menuItem.code = data.vformcode;
    menuItem.path = data.menupath;
    return menuItem;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onChangePath(value: string): void {
    console.log('value !!!' + value);
    const settings = this.gridSettings$.getValue();
    settings.title = value;
    this.gridSettings$.next(settings);
  }
}
