import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('tk_acceso')
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) { }

  getPersonaPorNroDoc(nro_doc): Observable<any> {
    return this.http.get(environment.apiEndpoint+'/getPersonaPorNroDoc/'+nro_doc, httpOptions);
  }


}
