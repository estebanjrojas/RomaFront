import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ProductosService {
  constructor(private http: HttpClient, private Auth: AuthService) {}

  //---------------------------GET---------------------------//

  getProductosBusqueda(texto_busqueda): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getProductosBusqueda/" + texto_busqueda,
      httpOptions
    );
  }

  getProductosTodos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getProductosTodos/",
      httpOptions
    );
  }

  getDatosProductos(id_producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getDatosProductos/" + id_producto,
      httpOptions
    );
  }

  getCaracteristicasProductos(id_producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getCaracteristicasProductos/" + id_producto,
      httpOptions
    );
  }

  getCategoriasProductos(id_producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getCategoriasProductos/" + id_producto,
      httpOptions
    );
  }

  getUltimoPrecioValido(id_producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getUltimoPrecioValido/" + id_producto,
      httpOptions
    );
  }

  getHistorialPrecios(id_producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getHistorialPrecios/" + id_producto,
      httpOptions
    );
  }

  getImagenesProductos(id_producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getImagenesProductos/" + id_producto,
      httpOptions
    );
  }

  getProductosPorCategoriaCampoBusqueda(
    categorias_id,
    campo_buscar,
    texto_buscar
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint +
        "/getProductosPorCategoriaCampoBusqueda/" +
        categorias_id +
        "/" +
        campo_buscar +
        "/" +
        texto_buscar,
      httpOptions
    );
  }

  getFotosCargadas(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getFotosCargadas/" + id,
      httpOptions
    );
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasProductos(
    buscar_codigo,
    buscar_nombre,
    buscar_descripcion,
    buscar_categoria,
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
        "/getCantidadPaginasProductos/" +
        buscar_codigo +
        "/" +
        buscar_nombre +
        "/" +
        buscar_descripcion +
        "/" +
        buscar_categoria +
        "/" +
        txt,
      httpOptions
    );
  }

  getProductos(
    pagina_actual,
    cantidad_paginas,
    buscar_codigo,
    buscar_nombre,
    buscar_descripcion,
    buscar_categoria,
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
        "/getProductos/" +
        pagina_actual +
        "/" +
        cantidad_paginas +
        "/" +
        buscar_codigo +
        "/" +
        buscar_nombre +
        "/" +
        buscar_descripcion +
        "/" +
        buscar_categoria +
        "/" +
        txt,
      httpOptions
    );
  }
  //PAGINACION FIN <------------

  getNovedadesProductos(fecha_desde, fecha_hasta, limit): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint +
        "/getNovedadesProductosLimit/" +
        fecha_desde +
        "/" +
        fecha_hasta +
        "/" +
        limit,
      httpOptions
    );
  }

  verificarProductoPoseeCaracteristicas(productos_id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint +
        "/verificarProductoPoseeCaracteristicas/" +
        productos_id,
      httpOptions
    );
  }

  verificarProductoPoseeImagenes(productos_id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint +
        "/verificarProductoPoseeImagenes/" +
        productos_id,
      httpOptions
    );
  }

  getTiposProductos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/productos/tipos/",
      httpOptions
    );
  }
  //---------------------------POST---------------------------//

  insertProductoReturnId(datos: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/insertProductoReturnId`;
    let json = JSON.stringify(datos);
    return this.http.post(url, json, httpOptions);
  }

  insertNuevoPrecioProducto(precio: any, productos_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/insertNuevoPrecioProducto`;
    let json = JSON.stringify({ precio: precio, productos_id: productos_id });
    return this.http.post(url, json, httpOptions);
  }

  insertCaracteristicasProducto(caract: any, productos_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/insertCaracteristicasProducto`;
    let json = JSON.stringify({
      nombre: caract.nombre,
      descripcion: caract.descripcion,
      valor: caract.valor,
      productos_id: productos_id,
    });
    return this.http.post(url, json, httpOptions);
  }

  insertCategoriasProducto(cat: any, productos_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/insertCategoriasProducto`;
    let json = JSON.stringify({
      nombre: cat.nombre,
      categorias_id: cat.id,
      productos_id: productos_id,
    });
    return this.http.post(url, json, httpOptions);
  }

  cargarImagenProducto(imagen: any, productos_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/cargarImagenProducto`;
    let json = JSON.stringify({
      imagen: imagen.imagen,
      predeterminada: imagen.predeterminada,
      productos_id: productos_id,
    });
    return this.http.post(url, json, httpOptions);
  }

  insertProducto(datos: any) {
    console.log({ datos: datos });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/insertProducto`;
    let json = JSON.stringify(datos);
    console.log({ json: json });
    return this.http.post(url, json, httpOptions);
  }

  //---------------------------PUT---------------------------//

  actualizarDatosProductos(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify(datos);
    return this.http.put(
      environment.apiEndpoint + "/actualizarDatosProductos",
      json,
      httpOptions
    );
  }

  actualizarFechaHastaPrecio(productos_id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify({ productos_id: productos_id });
    return this.http.put(
      environment.apiEndpoint + "/actualizarFechaHastaPrecio",
      json,
      httpOptions
    );
  }

  updateProducto(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    let json = JSON.stringify(datos);
    return this.http.put(
      environment.apiEndpoint + "/updateProducto",
      json,
      httpOptions
    );
  }

  //---------------------------DELETE---------------------------//

  eliminarImagenesProductos(productos_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url =
      environment.apiEndpoint + `/eliminarImagenesProductos/` + productos_id;
    return this.http.delete(url, httpOptions);
  }

  eliminarCaracteristicasProductos(id_producto: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url =
      environment.apiEndpoint +
      `/eliminarCaracteristicasProductos/` +
      id_producto;
    return this.http.delete(url, httpOptions);
  }

  eliminarProductoById(productos_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url =
      environment.apiEndpoint + `/eliminarProductoById/` + productos_id;
    return this.http.delete(url, httpOptions);
  }

  deleteProducto(productos_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    const url = environment.apiEndpoint + `/deleteProducto/` + productos_id;
    return this.http.delete(url, httpOptions);
  }
}
