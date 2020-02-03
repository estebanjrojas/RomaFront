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


  //GET's

  getDatosUsuario(usuario) {
    return this.http.get(environment.apiEndpoint + '/getDatosUsuario/' + usuario, httpOptions);
  }

  getUsuariosBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getUsuariosBusqueda/' + texto_busqueda, httpOptions);
  }

  getUsuariosTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getUsuariosTodos/', httpOptions);
  }

  getDatosUsuariosCargados(id_usuario: number): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getDatosUsuariosCargados/' + id_usuario, httpOptions);
  }

  getPerfilesAsignados(id_perfiles: number): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getPerfilesAsignados/' + id_perfiles, httpOptions);
  }

  getPerfilesSinAsignar(id_perfiles: number): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getPerfilesSinAsignar/' + id_perfiles, httpOptions);
  }

  validarPassVieja(usuario, password) {
    return this.http.get(environment.apiEndpoint + '/validarPassVieja/' + usuario + '/' + password, { observe: 'response' });
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasUsuarios(buscar_nombre, buscar_usuario, buscar_descripcion, txt): Observable<any> {
    return this.http.get(environment.apiEndpoint +
      '/getCantidadPaginasUsuarios/' +
      buscar_nombre + '/' +
      buscar_usuario + '/' +
      buscar_descripcion + '/' +
      txt,
      httpOptions);
  }

  getUsuarios(pagina_actual, cantidad_paginas, buscar_nombre, buscar_usuario, buscar_descripcion, txt): Observable<any> {
    return this.http.get(environment.apiEndpoint +
      '/getUsuarios/' +
      pagina_actual + '/' +
      cantidad_paginas + '/' +
      buscar_nombre + '/' +
      buscar_usuario + '/' +
      buscar_descripcion + '/' +
      txt,
      httpOptions);
  }
  //PAGINACION FIN <------------


  //POST's

  insertPerfilesAsignados(perfiles: any, id_usuario: number) {
    const url = environment.apiEndpoint + `/insertPerfilesAsignados`;
    let json = JSON.stringify({
      "perfiles_id": perfiles.id
      , "usuarios_id": id_usuario
    });
    console.log("Este es el json que armo en el service:" + json);
    return this.http.post(url, json, httpOptions);
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



  //PUT's

  cambiarPassword(usuario: any, password: any): Observable<any> {
    let json = JSON.stringify({ "usuario": usuario, "password": password });
    console.log("Este es el json que armo en el service:" + json);
    return this.http.put(environment.apiEndpoint + '/cambiarPassword', json, httpOptions);
  }

  actualizarDatosUsuarios(datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    return this.http.put(environment.apiEndpoint + '/actualizarDatosUsuarios', json, httpOptions);
  }

  //DELETE's

  deletePerfiles(id_usuario: number): Observable<any> {
    const url = environment.apiEndpoint + `/deletePerfiles/` + id_usuario;
    return this.http.delete(url, httpOptions);
  }


}
