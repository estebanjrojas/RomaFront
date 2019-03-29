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
export class PuntosVentaService {

  constructor(private http: HttpClient) { }

  getPuntosVentaBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getPuntosVentaBusqueda/' + texto_busqueda, httpOptions);
  }

  getPuntosVentaTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getPuntosVentaTodos/', httpOptions);
  }

  insertPuntoVentaReturnId(datos: any) {
    const url = environment.apiEndpoint + `/insertPuntoVentaReturnId`;
    let json = JSON.stringify(datos);
    return this.http.post(url, json, httpOptions);
  }

  insertCaracteristicasPuntoVenta(caract: any, punto_venta_id: number) {
    const url = environment.apiEndpoint + `/insertCaracteristicasPuntoVenta`;
    let json = JSON.stringify({
      "tipo": caract.tipo, "ultimo_nro": caract.ultimo_nro
      , "por_defecto": caract.por_defecto, "punto_venta_id": punto_venta_id
    });
    console.log("Estos son los datos del servicio:" + json);
    return this.http.post(url, json, httpOptions);
  }

  actualizarDatosPuntoVenta(datos: any): Observable<any> {
    let json = JSON.stringify(datos);
    return this.http.put(environment.apiEndpoint + '/actualizarDatosPuntoVenta', json, httpOptions);
  }


  eliminarCaracteristicasPuntoVenta(id_punto_venta: number) {
    const url = environment.apiEndpoint + `/eliminarCaracteristicasPuntoVenta/` + id_punto_venta;
    return this.http.delete(url, httpOptions);
  }




}
