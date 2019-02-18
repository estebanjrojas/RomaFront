import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tk_acceso')
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

  cargarProducto(menu: any) {
    const url = environment.apiEndpoint+`/cargarProducto`;
    let json = JSON.stringify(menu);
    return this.http.post(url, json, httpOptions);
  }

  actualizarDatosProducto(datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    return this.http.put(environment.apiEndpoint+'/actualizarDatosFallecido', json, httpOptions);
  }

}
