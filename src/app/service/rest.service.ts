import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU1Mjg2ODI3IiwibmFtZSI6ItCa0L7RgdGC0LXQstC40Ycg0JDQu9C10LrRgdC10L' +
  'kg0J7Qu9C10LPQvtCy0LjRhyIsIm5tbnMiOiI4LjQyMDEiLCJjb250ZXh0IjoiZXJ6cmYtcHJpdmF0ZSIsInZpZCI6ImRldiIsImV4cCI6MTU4NTU1' +
  'ODk0Mn0.LC4M2Cv8XD5hB9TT03Pp47Z1EIKKGPFhUTjbOmqdzWI';

const BASE_URL = 'https://erz-dev.sws.by';
const API = '/api';
const ERZ_REST = '/erz-rest';
const DATA = '/data';
const STRUCTURE = '/structure';

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
    return this.methodPost<T>(BASE_URL + API + ERZ_REST + DATA + '/' + name, data).pipe(map(response => response[name]));
  }
}
