import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('tk_acceso')
    }
  )
};

const apiUrl = "http://192.168.1.44:3000";

@Injectable({
  providedIn: 'root'
})
export class TabgralService {

  constructor(private http: HttpClient) { }

  selectByNroTab(nro_tab): Observable<any> {
    return this.http.get('http://192.168.1.46:3000/selectTabgralByNroTab/'+nro_tab);
  }
}
