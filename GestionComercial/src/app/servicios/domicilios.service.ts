import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DomiciliosService {

  constructor(private http: HttpClient) { }

  getProvinciasPorPais(paices_id){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint+'/getProvinciasPorPais/'+paices_id, httpOptions);
  }

  getCiudadesPorProvincia(provincias_id){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint+'/getCiudadesPorProvincia/'+provincias_id, httpOptions);
  }


  getCiudadesPorDepartamentos(provincias_id) {
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getCiudadesPorDepartamentos/' + provincias_id, httpOptions);
  }




  getDomicilioByNroDoc(nro_doc){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint+'/getDomicilioByNroDoc/'+nro_doc, httpOptions);
  }

  getCiudadesIdPorNombre(nombre){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint+'/getCiudadesIdPorNombre/'+nombre, httpOptions);
  }


  getCalles(calle_nombre) {
    let url
    if (calle_nombre == "") {
      url = environment.apiEndpoint + '/getCallesEmpty/';
    } else {
      url = environment.apiEndpoint + '/getCalles/';
    }
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(url + calle_nombre, httpOptions);
  }

  insert(domicilio: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('roma_acceso')
        }
      )
    };
    let json = JSON.stringify(domicilio);
    return this.http.put(environment.apiEndpoint+'/insert/', json, httpOptions);
  }
}
