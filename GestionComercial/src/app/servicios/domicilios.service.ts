import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Domicilios } from '../modelos/Domicilios';



@Injectable({
  providedIn: 'root'
})
export class DomiciliosService {
  miDomicilios: Domicilios = this.inicializarDomicilios();

  constructor(private http: HttpClient, private Auth: AuthService) { }

  inicializarDomicilios() {
    return {
      ciudades_id: '',
      calles_id: '',
      calle_descripcion: '',
      numero_puerta: '',
      piso: '',
      departamento_descripcion: '',
      manzana: '',
      lote: '',
      barrio: '',
      observaciones: '',
      nombre_usuario: '',
      domicilios_id: '',
      tipo_domicilio: 0,
      persona_id: ''
    }
  }

  setDomicilio(domicilio: Domicilios) {
    this.miDomicilios = domicilio;
  }

  getDomicilio() {
    return this.miDomicilios;
  }



  getProvinciasPorPais(paices_id){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint+'/getProvinciasPorPais/'+paices_id, httpOptions);
  }

  getCiudadesPorProvincia(provincias_id){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint+'/getCiudadesPorProvincia/'+provincias_id, httpOptions);
  }


  getCiudadesPorDepartamentos(provincias_id) {
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getCiudadesPorDepartamentos/' + provincias_id, httpOptions);
  }




  getDomicilioByNroDoc(nro_doc){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint+'/getDomicilioByNroDoc/'+nro_doc, httpOptions);
  }

  getCiudadesIdPorNombre(nombre){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
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
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(url + calle_nombre, httpOptions);
  }


  getCallesIdPorNombre(nombre: string, usuario: string) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getCallesIdPorNombre/' + nombre + '/' + usuario, httpOptions);
  }



  insert(domicilio: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    let json = JSON.stringify(domicilio);
    return this.http.put(environment.apiEndpoint+'/insert/', json, httpOptions);
  }
}
