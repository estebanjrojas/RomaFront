import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('roma_acceso')
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) { }

  getPersonaPorNroDoc(tipo_doc, nro_doc): Observable<any> {
    return this.http.get(environment.apiEndpoint+'/getPersonaPorNroDoc/'+tipo_doc+'/'+nro_doc, httpOptions);
  }

  insertPersonaDomicilio(persona: any) {
    let json = JSON.stringify(persona);
    return this.http.put(environment.apiEndpoint+'/insertPersonaDomicilio/', json, httpOptions);
  }


}
