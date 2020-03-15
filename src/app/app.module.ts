import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {GridComponent} from './grid/grid.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { PopupComponent } from './popup/popup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InputComponent } from './items/input/input.component';
import { DynamicFieldDirective } from './items/derictive/dynamic-field.directive';
import { SelectComponent } from './items/select/select.component';

const appRoutes: Routes = [
  {path: 'register', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    HomeComponent,
    GridComponent,
    DynamicFormComponent,
    PopupComponent,
    InputComponent,
    DynamicFieldDirective,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    ),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
