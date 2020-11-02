import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient, private Auth: AuthService) { }

  getFacturaPDF(facturas_id) {
    const httpOptions = {
      headers: new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "aplication/pdf")
      .set("responseType", "blob")
      .set("Authorization", this.Auth.getTokenUsuarioSesion())
        
    };
    return this.http.get(environment.apiEndpoint + `/generarFacturaPDF/${facturas_id}`, httpOptions);
  }

}
