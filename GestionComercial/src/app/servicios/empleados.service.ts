import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class EmpleadosService {

  constructor(private http: HttpClient) { }


  getEmpleadoPorNroDoc(nro_doc) {
    return this.http.get(environment.apiEndpoint + '/getEmpleadoPorNroDoc/' + nro_doc, httpOptions);
  }

  getEmpleadosBusqueda(texto_busqueda) {
    return this.http.get(environment.apiEndpoint + '/getEmpleadosBusqueda/' + texto_busqueda, httpOptions);
  }

  getEmpleadosTodos() {
    return this.http.get(environment.apiEndpoint + '/getEmpleadosTodos/', httpOptions);
  }

  insertEmpleadoPersonaDomicilio(empleado: any) {
    let json = JSON.stringify(empleado);
    return this.http.post(environment.apiEndpoint+'/insertEmpleadoPersonaDomicilio/', json, httpOptions);
  }
  getEmpleadosSinUsuario() {
    return this.http.get(environment.apiEndpoint + '/getEmpleadosSinUsuario/', httpOptions);
  }

  getEmpleadosById(id) {
    return this.http.get(environment.apiEndpoint + '/getEmpleadoById/' + id, httpOptions);
  }



}
