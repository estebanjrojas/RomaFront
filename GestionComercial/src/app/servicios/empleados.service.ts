import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



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
    return this.http.get(environment.apiEndpoint + '/getEmpleadoPorNroDoc/' + tipo_doc+'/'+nro_doc, httpOptions);
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

  insertEmpleadoPersonaDomicilio(empleado: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    let json = JSON.stringify(empleado);
    return this.http.post(environment.apiEndpoint+'/insertEmpleadoPersonaDomicilio/', json, httpOptions);
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



}
