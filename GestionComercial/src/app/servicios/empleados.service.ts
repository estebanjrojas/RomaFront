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
export class EmpleadosService {
  
  constructor(private http: HttpClient) { }
  

  getEmpleadoPorNroDoc(nro_doc): Observable<any> {
    return this.http.get(environment.apiEndpoint+'/getEmpleadoPorNroDoc/'+nro_doc, httpOptions);
  }

  getEmpleadosBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint+'/getEmpleadosBusqueda/'+texto_busqueda, httpOptions);
  }

  getEmpleadosTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint+'/getEmpleadosTodos/', httpOptions);
  }

}
