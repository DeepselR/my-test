import {Injectable} from '@angular/core';
import {InputComponent} from "./input/input.component";

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
    return InputComponent;
  }
}
