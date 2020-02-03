import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { VentasDetalle} from '../modelos/VentasDetalle';
import { Productos} from '../modelos/Productos';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('roma_acceso')
    }
  )
};

@Injectable({
  providedIn: 'root'
})


export class VentasService {

  miVentasDetalle: VentasDetalle[] = [];

  constructor(private http: HttpClient) { }


  getVentasBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getVentasBusqueda/' + texto_busqueda, httpOptions);
  }

  getVentasTodas(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getVentasTodas/', httpOptions);
  }

  getVentaPorId(ventas_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getVentaPorId/' + ventas_id, httpOptions);
  }


  agregarDetalleVentaActual(detalle: VentasDetalle) {
    this.miVentasDetalle.push(detalle);
  }

  quitarDetalleVenta(detalle: VentasDetalle) {
    for(let i=0; i<this.miVentasDetalle.length; i++) {
      if(this.miVentasDetalle[i] == detalle) {
        this.miVentasDetalle.splice(i, 1);
      }
    }
    
  }

  getDetalleVentaActual() {
    return this.miVentasDetalle;
  }

  insertVentaReturningFactura(datos: any) {
    const url = environment.apiEndpoint + `/insertVentaReturningFactura`;
    let json = JSON.stringify(datos);
    return this.http.post(url, json, httpOptions);
  }

  anularVenta(datos: any) {
    const url = environment.apiEndpoint + `/anularVenta`;
    let json = JSON.stringify(datos);
    return this.http.put(url, json, httpOptions);
  }
}
