import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class EmpleadosService {
  constructor(private http: HttpClient, private Auth: AuthService) {}

  //GET

  getEmpleadoPorNroDoc(tipo_doc, nro_doc) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint +
        "/getEmpleadoPorNroDoc/" +
        tipo_doc +
        "/" +
        nro_doc,
      httpOptions
    );
  }

  getEmpleadosBusqueda(texto_busqueda) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getEmpleadosBusqueda/" + texto_busqueda,
      httpOptions
    );
  }

  getEmpleadosTodos() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getEmpleadosTodos/",
      httpOptions
    );
  }

  getEmpleadosSinUsuario() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getEmpleadosSinUsuario/",
      httpOptions
    );
  }

  getDatosEmpleadoPorId(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getDatosEmpleadoPorId/" + id,
      httpOptions
    );
  }

  getOficinas() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getOficinas/",
      httpOptions
    );
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasEmpleados(
    buscar_nombre,
    buscar_documento,
    buscar_fechanac,
    buscar_oficina,
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
        "/getCantidadPaginasEmpleados/" +
        buscar_nombre +
        "/" +
        buscar_documento +
        "/" +
        buscar_fechanac +
        "/" +
        buscar_oficina +
        "/" +
        txt,
      httpOptions
    );
  }

  getEmpleados(
    pagina_actual,
    cantidad_paginas,
    buscar_nombre,
    buscar_documento,
    buscar_fechanac,
    buscar_oficina,
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
        "/getEmpleados/" +
        pagina_actual +
        "/" +
        cantidad_paginas +
        "/" +
        buscar_nombre +
        "/" +
        buscar_documento +
        "/" +
        buscar_fechanac +
        "/" +
        buscar_oficina +
        "/" +
        txt,
      httpOptions
    );
  }
  //PAGINACION FIN <------------

  //POST

  guardarEmpleadoPersonaDomicilio(empleado: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify(empleado);
    return this.http.post(
      environment.apiEndpoint + "/guardarEmpleadoPersonaDomicilio/",
      json,
      httpOptions
    );
  }

  insertEmpleado(datos: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify(datos);
    return this.http.post(
      environment.apiEndpoint + "/insertEmpleado/",
      json,
      httpOptions
    );
  }

  //PUT
  updateEmpleado(datos: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify(datos);
    return this.http.post(
      environment.apiEndpoint + "/updateEmpleado/",
      json,
      httpOptions
    );
  }

  //DELETE

  deleteEmpleado(empleado_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/deleteEmpleado/` + empleado_id;
    return this.http.delete(url, httpOptions);
  }
}
