import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('roma_acceso')
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class PuntosVentaService {

  constructor(private http: HttpClient) { }

  getPuntosVentaBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getPuntosVentaBusqueda/' + texto_busqueda, httpOptions);
  }

  getPuntosVentaTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getPuntosVentaTodos/', httpOptions);
  }




}
