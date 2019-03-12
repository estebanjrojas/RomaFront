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

  insertUsuarioReturnId(datos: any, usuarios: any) {
    const url = environment.apiEndpoint + `/insertUsuarioReturnId`;
    let json = JSON.stringify({
        "nombre_usuario": datos.nombre_usuario
      , "chk_debug": datos.chk_debug
      , "usuario": datos.nomb_usr
      , "personas_id": usuarios[0].personas_id
    });
    console.log("Este es el json que armo en el service:" + json);
    return this.http.post(url, json, httpOptions);
  }

  actualizarDatosUsuarios(datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    return this.http.put(environment.apiEndpoint + '/actualizarDatosUsuarios', json, httpOptions);
  }

  getDatosUsuariosCargados(id_usuario: number): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getDatosUsuariosCargados/' + id_usuario, httpOptions);
  }




}
