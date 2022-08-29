import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient, private Auth: AuthService) { }

  getPersonaPorNroDoc(tipo_doc, nro_doc): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };

    return this.http.get(environment.apiEndpoint+'/getPersonaPorNroDoc/'+tipo_doc+'/'+nro_doc, httpOptions);
  }

  insertPersonaDomicilio(persona: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    
    let json = JSON.stringify(persona);
    return this.http.put(environment.apiEndpoint+'/insertPersonaDomicilio/', json, httpOptions);
  }


}
