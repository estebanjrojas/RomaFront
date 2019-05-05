import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Clientes} from '../modelos/Clientes';

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

  miCliente: Clientes;

  constructor(private http: HttpClient) { }

  setCliente(cliente: Clientes) {
    this.miCliente = cliente;
  }

  getCliente() {
    return this.miCliente;
  }

  getClientesBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientesBusqueda/' + texto_busqueda, httpOptions);
  }

  getClientesTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientesTodos/', httpOptions);
  }

  getDatosClientePorId(id) {
    return this.http.get(environment.apiEndpoint + '/getDatosClientePorId/' + id, httpOptions);
  }

  insertClientePersonaDomicilio(empleado: any) {
    const json = JSON.stringify(empleado);
    return this.http.post(environment.apiEndpoint + '/insertClientePersonaDomicilio/', json, httpOptions);
  }

  getClientesWhere(campo_busqueda: string, texto_busqueda: string): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getClientesWhere/'+campo_busqueda+'/'+texto_busqueda, httpOptions);
  }




}
