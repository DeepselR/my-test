import {Injectable} from '@angular/core';
import {InputComponent} from './input/input.component';
import {SelectComponent} from './select/select.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentMapperService {

  constructor() {
  }

  public getComponent(type: string) {
    if (type === 'input') {
      return InputComponent;
    }
    if (type === 'select') {
      return SelectComponent;
    }
    return InputComponent;
  }
}
