import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { VentasDetalle } from '../modelos/VentasDetalle';
import { Productos } from '../modelos/Productos';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})


export class VentasService {

  miVentasDetalle: VentasDetalle[] = [];

  constructor(private http: HttpClient, private Auth: AuthService) { }



  //GET's

  getVentasBusqueda(texto_busqueda): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getVentasBusqueda/' + texto_busqueda, httpOptions);
  }

  getVentasTodas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getVentasTodas/', httpOptions);
  }

  getVentaPorId(ventas_id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getVentaPorId/' + ventas_id, httpOptions);
  }

  getDetalleVentaPorVentasId(ventas_id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getDetalleVentaPorVentasId/' + ventas_id, httpOptions);
  }

  getDetalleVentaActual() {
    return this.miVentasDetalle;
  }

  //PAGINACION INICIO --------->

  getCantidadPaginasVentas(buscar_fecha, buscar_nombre, buscar_vendedor, buscar_monto, txt): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint +
      '/getCantidadPaginasVentas/' +
      buscar_fecha + '/' +
      buscar_nombre + '/' +
      buscar_vendedor + '/' +
      buscar_monto + '/' +
      txt,
      httpOptions);
  }

  getVentas(pagina_actual, cantidad_paginas, buscar_fecha, buscar_nombre, buscar_vendedor, buscar_monto, txt): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint +
      '/getVentas/' +
      pagina_actual + '/' +
      cantidad_paginas + '/' +
      buscar_fecha + '/' +
      buscar_nombre + '/' +
      buscar_vendedor + '/' +
      buscar_monto + '/' +
      txt,
      httpOptions);
  }
  //PAGINACION FIN <------------



  //PUSH's

  agregarDetalleVentaActual(detalle: VentasDetalle) {
    this.miVentasDetalle.push(detalle);
  }

  quitarDetalleVenta(detalle: VentasDetalle) {
    for (let i = 0; i < this.miVentasDetalle.length; i++) {
      if (this.miVentasDetalle[i] == detalle) {
        this.miVentasDetalle.splice(i, 1);
      }
    }
  }

  insertVentaReturningFactura(datos: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    const url = environment.apiEndpoint + `/insertVentaReturningFactura`;
    let json = JSON.stringify(datos);
    return this.http.post(url, json, httpOptions);
  }


  //PUT's
  
    anularVenta(datos: any) {
      const httpOptions = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': this.Auth.getTokenUsuarioSesion()
          }
        )
      };
      const url = environment.apiEndpoint + `/anularVenta`;
      let json = JSON.stringify(datos);
      return this.http.put(url, json, httpOptions);
    }



  //DELETE's
}
