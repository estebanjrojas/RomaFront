import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Clientes } from '../modelos/Clientes';


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
export class ClientesService {

  miCliente: Clientes;

  constructor(private http: HttpClient) { }

  setCliente(cliente: Clientes) {
    this.miCliente = cliente;
  }

  getCliente() {
    return this.miCliente;
  }

  //---------------------------GET's---------------------------//

  getClientesBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientesBusqueda/' + texto_busqueda, httpOptions);
  }

  getClientesTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientesTodos/', httpOptions);
  }

  getDatosClientePorId(id) {
    return this.http.get(environment.apiEndpoint + '/getDatosClientePorId/' + id, httpOptions);
  }

  getClientesWhere(campo_busqueda: string, texto_busqueda: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientesWhere/' + campo_busqueda + '/' + texto_busqueda, httpOptions);
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasClientes(buscar_nombre, buscar_apellido, buscar_dni, buscar_fecha_nac, txt): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getCantidadPaginasClientes/' + buscar_nombre + '/' + buscar_apellido + '/'  + buscar_dni + '/' + buscar_fecha_nac + '/' + txt, httpOptions);
  }

  getClientes(pagina_actual, cantidad_paginas, buscar_nombre, buscar_apellido, buscar_dni, buscar_fecha_nac, txt): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientes/' + pagina_actual + '/' + cantidad_paginas + '/' + buscar_nombre + '/' + buscar_apellido + '/' + buscar_dni + '/' + buscar_fecha_nac + '/' + txt, httpOptions);
  }
  //PAGINACION FIN <------------


  //---------------------------POST's---------------------------//
  insertClientePersonaDomicilio(empleado: any) {
    const json = JSON.stringify(empleado);
    return this.http.post(environment.apiEndpoint + '/insertClientePersonaDomicilio/', json, httpOptions);
  }


  //---------------------------PUT's---------------------------//

  //---------------------------DELETE's---------------------------//



}
