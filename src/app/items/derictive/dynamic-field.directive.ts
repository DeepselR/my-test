import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../field';
import {ComponentMapperService} from "../component-mapper.service";
// import { ButtonComponent } from '../button/button.component';
// import { SelectComponent } from '../select/select.component';
// import { DateComponent } from '../date/date.component';
// import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
// import { CheckboxComponent } from '../checkbox/checkbox.component';

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field?: Field;
  @Input() group?: FormGroup;
  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private componentService: ComponentMapperService,
  ) {
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.componentService.getComponent(this.field.type));
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}
