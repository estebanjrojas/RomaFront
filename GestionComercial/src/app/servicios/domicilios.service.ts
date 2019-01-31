import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

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
export class DomiciliosService {

  constructor(private http: HttpClient) { }

  getProvinciasPorPais(paices_id){
    return this.http.get(environment.apiEndpoint+'/getProvinciasPorPais/'+paices_id, httpOptions);
  }

  getCiudadesPorProvincia(provincias_id){
    return this.http.get(environment.apiEndpoint+'/getCiudadesPorProvincia/'+provincias_id, httpOptions);
  }
}
