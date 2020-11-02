import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PuntosVentaService {

  constructor(private http: HttpClient, private Auth: AuthService) { }

  getPuntosVentaBusqueda(texto_busqueda): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getPuntosVentaBusqueda/' + texto_busqueda, httpOptions);
  }

  getPuntosVentaTodos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getPuntosVentaTodos/', httpOptions);
  }

  getDatosPuntosVenta(id_punto_venta): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getDatosPuntosVenta/' + id_punto_venta, httpOptions);
  }

  getCaracteristicasPuntosVenta(id_punto_venta): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    return this.http.get(environment.apiEndpoint + '/getCaracteristicasPuntosVenta/' + id_punto_venta, httpOptions);
  }

  insertPuntoVentaReturnId(datos: any) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    const url = environment.apiEndpoint + `/insertPuntoVentaReturnId`;
    let json = JSON.stringify(datos);
    return this.http.post(url, json, httpOptions);
  }

  insertCaracteristicasPuntoVenta(caract: any, punto_venta_id: number) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    const url = environment.apiEndpoint + `/insertCaracteristicasPuntoVenta`;
    let json = JSON.stringify({
      "tipo": caract.tipo, "ultimo_nro": caract.ultimo_nro
      , "por_defecto": caract.por_defecto, "punto_venta_id": punto_venta_id
    });
    console.log("Estos son los datos del servicio:" + json);
    return this.http.post(url, json, httpOptions);
  }

  actualizarDatosPuntoVenta(datos: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    let json = JSON.stringify(datos);
    return this.http.put(environment.apiEndpoint + '/actualizarDatosPuntoVenta', json, httpOptions);
  }


  eliminarCaracteristicasPuntoVenta(id_punto_venta: number) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.Auth.getTokenUsuarioSesion()
        }
      )
    };
    const url = environment.apiEndpoint + `/eliminarCaracteristicasPuntoVenta/` + id_punto_venta;
    return this.http.delete(url, httpOptions);
  }




}
