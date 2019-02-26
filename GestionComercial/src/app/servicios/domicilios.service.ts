import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

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
export class DomiciliosService {

  constructor(private http: HttpClient) { }

  getProvinciasPorPais(paices_id){
    return this.http.get(environment.apiEndpoint+'/getProvinciasPorPais/'+paices_id, httpOptions);
  }

  getCiudadesPorProvincia(provincias_id){
    return this.http.get(environment.apiEndpoint+'/getCiudadesPorProvincia/'+provincias_id, httpOptions);
  }

  getDomicilioByNroDoc(nro_doc){
    return this.http.get(environment.apiEndpoint+'/getDomicilioByNroDoc/'+nro_doc, httpOptions);
  }

  getCiudadesIdPorNombre(nombre){
    return this.http.get(environment.apiEndpoint+'/getCiudadesIdPorNombre/'+nombre, httpOptions);
  }

  insert(domicilio: any) {
    let json = JSON.stringify(domicilio);
    return this.http.put(environment.apiEndpoint+'/insert/', json, httpOptions);
  }
}
