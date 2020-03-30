import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU1Mjg2ODI3IiwibmFtZSI6ItCa0L7RgdGC0LXQstC40' +
  'Ycg0JDQu9C10LrRgdC10Lkg0J7Qu9C10LPQvtCy0LjRhyIsIm5tbnMiOiI4LjQyMDEiLCJjb250ZXh0Ijoia2draXBrZCIs' +
  'InZpZCI6ImRldiIsImV4cCI6MTU4NjM0MTE5NH0.Hugsc1rKHY5KXIfp7j-h3dCr820Qkw_tZSt5h-5uXbg';

const BASE_URL = 'https://erz-dev.sws.by';
const API = '/api';
const ERZ_REST = '/erz-rest';
const DATA = '/data';
const STRUCTURE = '/structure';
const COUNT = '/count';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  methodGet<T>(url: string): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': TOKEN
      })
    };
    return this.http.get<T>(url, httpOptions);
  }

  methodPost<T>(url: string, data): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': TOKEN
      })
    };
    return this.http.post<T>(url, data, httpOptions);
  }

  getStructure(name: string): Observable<any> {
    return this.methodGet<any>(BASE_URL + API + ERZ_REST + STRUCTURE + '/' + name);
  }

  postData<T>(name: string, data: {}): Observable<T> {
    return this.methodPost<T>(BASE_URL + API + ERZ_REST + DATA + '/' + name, data);
  }

  getData<T>(name: string): Observable<T> {
    return this.methodGet<T>(BASE_URL + API + ERZ_REST + DATA + '/' + name);
  }

  getTableData<T>(name: string): Observable<T[]> {
    return this.methodGet<T>(BASE_URL + API + ERZ_REST + DATA + '/' + name).pipe(map(data => data[name]));
  }

  getPostTableData<T>(name: string, data: {}): Observable<T[]> {
    return this.methodPost<T>(BASE_URL + API + ERZ_REST + DATA + '/' + name, data).pipe(map(response => {
      if (response) {
        return response[name];
      }
    }));
  }

  count(name: string): Observable<number> {
    return this.methodPost(`${BASE_URL + API + ERZ_REST + COUNT}/${name}`, {});
  }
}
