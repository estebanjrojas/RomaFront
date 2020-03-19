import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { }

  getFacturaPDF(facturas_id) {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/pdf',
           'responseType': 'blob',
          'Authorization': localStorage.getItem('tk_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint + `/generarFacturaPDF/${facturas_id}`, httpOptions);
  }

}
