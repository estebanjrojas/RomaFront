import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaElectronicaService {

  constructor(private http: HttpClient) {}

  ultimoNumeroFacturaAprobada(punto_venta, tipo_comprobante) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + `/ultimoNumeroFacturaAprobada/${punto_venta}/${tipo_comprobante}`, httpOptions);
  }

  generarFacturaElectronica(ventas_id, tipo_comprobante) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + `/generarFacturaElectronica/${ventas_id}/${tipo_comprobante}`, httpOptions);
  }

  getDatosFacturaAfip(numero, punto_venta, tipo_comprobante) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + `/getDatosFacturaAfip/${numero}/${punto_venta}/${tipo_comprobante}`, httpOptions);
  }

  getEstadoServidor() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + `/getEstadoServidor`, httpOptions);
  }


}
