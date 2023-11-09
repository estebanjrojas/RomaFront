import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Categorias } from "../interfaces/Categorias";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("roma_acceso"),
  }),
};

@Injectable({
  providedIn: "root",
})
export class CategoriasService {
  categorias: Categorias[] = [];

  constructor(private http: HttpClient, private Auth: AuthService) {}

  setCategorias(json) {
    this.categorias = json;
  }

  //GET's

  obtenerJSONTodasCategorias() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("roma_acceso"),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/obtenerJSONTodasCategorias/",
      httpOptions
    );
  }

  public getCategorias(): any {
    return this.categorias;
  }

  getCategoriasBusqueda(texto_busqueda): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("roma_acceso"),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getCategoriasBusqueda/" + texto_busqueda,
      httpOptions
    );
  }

  getCategoriasTodas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("roma_acceso"),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getCategoriasTodas/",
      httpOptions
    );
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasCategorias(
    buscar_nombre,
    buscar_descripcion,
    buscar_catpadre,
    txt
  ): Observable<any> {
    return this.http.get(
      environment.apiEndpoint +
        "/getCantidadPaginasCategorias/" +
        buscar_nombre +
        "/" +
        buscar_descripcion +
        "/" +
        buscar_catpadre +
        "/" +
        txt,
      httpOptions
    );
  }

  getCategoria(
    pagina_actual,
    cantidad_paginas,
    buscar_nombre,
    buscar_descripcion,
    buscar_catpadre,
    txt
  ): Observable<any> {
    return this.http.get(
      environment.apiEndpoint +
        "/getCategorias/" +
        pagina_actual +
        "/" +
        cantidad_paginas +
        "/" +
        buscar_nombre +
        "/" +
        buscar_descripcion +
        "/" +
        buscar_catpadre +
        "/" +
        txt,
      httpOptions
    );
  }
  //PAGINACION FIN <------------

  getDatosCategorias(categorias_id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("roma_acceso"),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + `/getDatosCategorias/${categorias_id}`,
      httpOptions
    );
  }

  //POST's

  guardarCategoria(categoria: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("roma_acceso"),
      }),
    };
    const json = JSON.stringify(categoria);
    return this.http.post(
      environment.apiEndpoint + "/categorias/insert",
      json,
      httpOptions
    );
  }

  //PUT's

  updateCategoria(categoria: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("roma_acceso"),
      }),
    };
    const json = JSON.stringify(categoria);
    return this.http.put(
      environment.apiEndpoint + "/categorias/update",
      json,
      httpOptions
    );
  }

  //DELETE's
  deleteCategoria(categoria_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/categorias/delete/` + categoria_id;
    return this.http.delete(url, httpOptions);
  }
}
