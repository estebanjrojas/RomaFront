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
export class EmpleadosService {

  constructor(private http: HttpClient) { }


  getEmpleadoPorNroDoc(tipo_doc, nro_doc) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getEmpleadoPorNroDoc/' + tipo_doc + '/' + nro_doc, httpOptions);
  }

  getEmpleadosBusqueda(texto_busqueda) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getEmpleadosBusqueda/' + texto_busqueda, httpOptions);
  }

  getEmpleadosTodos() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getEmpleadosTodos/', httpOptions);
  }

  guardarEmpleadoPersonaDomicilio(empleado: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    let json = JSON.stringify(empleado);
    return this.http.post(environment.apiEndpoint + '/guardarEmpleadoPersonaDomicilio/', json, httpOptions);
  }
  getEmpleadosSinUsuario() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getEmpleadosSinUsuario/', httpOptions);
  }

  getDatosEmpleadoPorId(id) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getDatosEmpleadoPorId/' + id, httpOptions);
  }


  //PAGINACION INICIO --------->

  getCantidadPaginasEmpleados(buscar_nombre, buscar_documento, buscar_fechanac, buscar_oficina, txt): Observable<any> {
    return this.http.get(environment.apiEndpoint +
      '/getCantidadPaginasEmpleados/' +
      buscar_nombre + '/' +
      buscar_documento + '/' +
      buscar_fechanac + '/' +
      buscar_oficina + '/' +
      txt,
      httpOptions);
  }

  getEmpleados(pagina_actual, cantidad_paginas, buscar_nombre, buscar_documento, buscar_fechanac, buscar_oficina, txt): Observable<any> {
    return this.http.get(environment.apiEndpoint +
      '/getEmpleados/' +
      pagina_actual + '/' +
      cantidad_paginas + '/' +
      buscar_nombre + '/' +
      buscar_documento + '/' +
      buscar_fechanac + '/' +
      buscar_oficina + '/' +
      txt,
      httpOptions);
  }
  //PAGINACION FIN <------------


}
