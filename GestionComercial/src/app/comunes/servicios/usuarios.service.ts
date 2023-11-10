import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  constructor(private http: HttpClient, private Auth: AuthService) {}

  //GET's

  getDatosUsuario(usuario) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getDatosUsuario/" + usuario,
      httpOptions
    );
  }

  getUsuariosBusqueda(texto_busqueda): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getUsuariosBusqueda/" + texto_busqueda,
      httpOptions
    );
  }

  getUsuariosTodos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getUsuariosTodos/",
      httpOptions
    );
  }

  getDatosUsuariosCargados(id_usuario: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getDatosUsuariosCargados/" + id_usuario,
      httpOptions
    );
  }

  getPerfilesAsignados(id_perfiles: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getPerfilesAsignados/" + id_perfiles,
      httpOptions
    );
  }

  getPerfilesSinAsignar(id_perfiles: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getPerfilesSinAsignar/" + id_perfiles,
      httpOptions
    );
  }

  getPerfilesCodificados(nombreUsuario: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      `${environment.apiEndpoint}/getPerfilesCodificadosUsuario/${nombreUsuario}`,
      httpOptions
    );
  }

  validarPassVieja(usuario, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/validarPassVieja/" + usuario + "/" + password,
      { observe: "response" }
    );
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasUsuarios(
    buscar_nombre,
    buscar_usuario,
    buscar_descripcion,
    txt
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint +
        "/getCantidadPaginasUsuarios/" +
        buscar_nombre +
        "/" +
        buscar_usuario +
        "/" +
        buscar_descripcion +
        "/" +
        txt,
      httpOptions
    );
  }

  getUsuarios(
    pagina_actual,
    cantidad_paginas,
    buscar_nombre,
    buscar_usuario,
    buscar_descripcion,
    txt
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint +
        "/getUsuarios/" +
        pagina_actual +
        "/" +
        cantidad_paginas +
        "/" +
        buscar_nombre +
        "/" +
        buscar_usuario +
        "/" +
        buscar_descripcion +
        "/" +
        txt,
      httpOptions
    );
  }
  //PAGINACION FIN <------------

  //POST's

  insertPerfilesAsignados(perfiles: any, id_usuario: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/insertPerfilesAsignados`;
    let json = JSON.stringify({
      perfiles_id: perfiles.id,
      usuarios_id: id_usuario,
    });
    return this.http.post(url, json, httpOptions);
  }

  insertUsuarioReturnId(datos: any, usuarios: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/insertUsuarioReturnId`;
    let json = JSON.stringify({
      nombre_usuario: datos.nombre_usuario,
      chk_debug: datos.chk_debug,
      usuario: datos.nomb_usr,
      personas_id: usuarios[0].personas_id,
    });
    return this.http.post(url, json, httpOptions);
  }

  //PUT's

  cambiarPassword(usuario: any, password: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify({ usuario: usuario, password: password });
    return this.http.put(
      environment.apiEndpoint + "/cambiarPassword",
      json,
      httpOptions
    );
  }

  actualizarDatosUsuarios(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify(datos);
    return this.http.put(
      environment.apiEndpoint + "/actualizarDatosUsuarios",
      json,
      httpOptions
    );
  }

  updatePerfiles(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify(datos);
    console.log({ json: json });
    return this.http.put(
      environment.apiEndpoint + "/updatePerfiles",
      json,
      httpOptions
    );
  }

  //DELETE's

  deletePerfiles(id_usuario: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/deletePerfiles/` + id_usuario;
    return this.http.delete(url, httpOptions);
  }
}
