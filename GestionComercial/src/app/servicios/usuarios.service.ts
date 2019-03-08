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
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getDatosUsuario(usuario) {
    return this.http.get(environment.apiEndpoint + '/getDatosUsuario/' + usuario, httpOptions);
  }

  getUsuariosBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getUsuariosBusqueda/' + texto_busqueda, httpOptions);
  }

  getUsuariosTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getUsuariosTodos/', httpOptions);
  }



}
