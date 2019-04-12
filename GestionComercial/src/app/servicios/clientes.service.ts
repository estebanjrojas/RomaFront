import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Categorias } from '../../app/modelos/Categorias';
import { Observable } from 'rxjs';


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
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientesBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientesBusqueda/' + texto_busqueda, httpOptions);
  }

  getClientesTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientesTodos/', httpOptions);
  }

}
