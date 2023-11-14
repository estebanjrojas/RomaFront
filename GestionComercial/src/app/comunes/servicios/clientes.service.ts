import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Clientes } from "../interfaces/Clientes";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  miCliente: Clientes;

  constructor(private http: HttpClient, private Auth: AuthService) {}

  setCliente(cliente: Clientes) {
    this.miCliente = cliente;
  }

  getCliente() {
    return this.miCliente;
  }

  //---------------------------GET's---------------------------//

  getClientesBusqueda(texto_busqueda): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getClientesBusqueda/" + texto_busqueda,
      httpOptions
    );
  }

  getClientesTodos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getClientesTodos/",
      httpOptions
    );
  }

  getDatosClientePorId(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getDatosClientePorId/" + id,
      httpOptions
    );
  }

  getClientesWhere(
    campo_busqueda: string,
    texto_busqueda: string
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint +
        "/getClientesWhere/" +
        campo_busqueda +
        "/" +
        texto_busqueda,
      httpOptions
    );
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasClientes(
    buscar_nombre,
    buscar_apellido,
    buscar_dni,
    buscar_fecha_nac,
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
        "/getCantidadPaginasClientes/" +
        buscar_nombre +
        "/" +
        buscar_apellido +
        "/" +
        buscar_dni +
        "/" +
        buscar_fecha_nac +
        "/" +
        txt,
      httpOptions
    );
  }

  getClientes(
    pagina_actual,
    cantidad_paginas,
    buscar_nombre,
    buscar_apellido,
    buscar_dni,
    buscar_fecha_nac,
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
        "/getClientes/" +
        pagina_actual +
        "/" +
        cantidad_paginas +
        "/" +
        buscar_nombre +
        "/" +
        buscar_apellido +
        "/" +
        buscar_dni +
        "/" +
        buscar_fecha_nac +
        "/" +
        txt,
      httpOptions
    );
  }
  //PAGINACION FIN <------------

  //---------------------------POST's---------------------------//
  insertClientePersonaDomicilio(empleado: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const json = JSON.stringify(empleado);
    return this.http.post(
      environment.apiEndpoint + "/insertClientePersonaDomicilio/",
      json,
      httpOptions
    );
  }

  guardarClientePersonaDomicilio(cliente: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const json = JSON.stringify(cliente);
    return this.http.post(
      environment.apiEndpoint + "/guardarClientePersonaDomicilio/",
      json,
      httpOptions
    );
  }

  insertCliente(datos: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify(datos);
    return this.http.post(
      environment.apiEndpoint + "/insertCliente/",
      json,
      httpOptions
    );
  }

  //DELETE

  deleteCliente(cliente_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/deleteCliente/` + cliente_id;
    return this.http.delete(url, httpOptions);
  }
}
