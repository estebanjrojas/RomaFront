import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
export class ProductosService {

  constructor(private http: HttpClient) { }


  getProductosBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getProductosBusqueda/' + texto_busqueda, httpOptions);
  }

  getProductosTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getProductosTodos/', httpOptions);
  }

  getDatosProductos(id_producto): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getDatosProductos/' + id_producto, httpOptions);
  }

  getCaracteristicasProductos(id_producto): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getCaracteristicasProductos/' + id_producto, httpOptions);
  }

  getCategoriasProductos(id_producto): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getCategoriasProductos/' + id_producto, httpOptions);
  }

  insertProductoReturnId(datos: any) {
    const url = environment.apiEndpoint + `/insertProductoReturnId`;
    let json = JSON.stringify(datos);
    return this.http.post(url, json, httpOptions);
  }

  insertCaracteristicasProducto(caract: any, productos_id: number) {
    const url = environment.apiEndpoint + `/insertCaracteristicasProducto`;
    let json = JSON.stringify({
      "nombre": caract.nombre, "descripcion": caract.descripcion
      , "unidad_medida": caract.unidad_medida, "valor": caract.valor
      , "productos_id": productos_id
    });
    return this.http.post(url, json, httpOptions);
  }

  insertCategoriasProducto(cat: any, productos_id: number) {
    const url = environment.apiEndpoint + `/insertCategoriasProducto`;
    let json = JSON.stringify({"nombre": cat.nombre, "categorias_id": cat.id, "productos_id": productos_id});
    return this.http.post(url, json, httpOptions);
  }

  actualizarDatosProductos(datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    return this.http.put(environment.apiEndpoint + '/actualizarDatosProductos', json, httpOptions);
  }


  eliminarCaracteristicasProductos(id_producto: number) {
    const url = environment.apiEndpoint + `/eliminarCaracteristicasProductos/` + id_producto;
    return this.http.delete(url, httpOptions);
  }

  getImagenesProductos(id_producto): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getImagenesProductos/' + id_producto, httpOptions);
  }

  getProductosPorCategoriaCampoBusqueda(categorias_id, campo_buscar, texto_buscar): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getProductosPorCategoriaCampoBusqueda/'+categorias_id+'/'+campo_buscar+'/'+texto_buscar, httpOptions);
  }

}
