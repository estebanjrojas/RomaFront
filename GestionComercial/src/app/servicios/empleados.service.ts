import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { environment} from '../../environments/environment';
import { Empleados } from '../modelos/Empleados';
const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('roma_acceso')
=======
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tk_acceso')
>>>>>>> 59518fa27db2f152654a81af6ad078f84ab2fe1b
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

<<<<<<< HEAD
  miEmpleado : Empleados; //variable que se utiliza para pasar un empleado de componente a otro a través de sus métodos get y set
  
  constructor(private http: HttpClient) { }
  
  inicializarMiEmpleado() {
    this.miEmpleado = {
      empleados_id : 0,
      legajo : 0,
      fecha_ingreso : undefined,
      descripcion : '',
      empresas_id : 0,
      oficina : 0,
      persona : undefined
    }
  }

  setMiEmpleado(empleado : Empleados) {
    this.miEmpleado = empleado;
  }

  getMiEmpleado() {
    return this.miEmpleado;
  }
=======
  constructor(private http: HttpClient) { }

>>>>>>> 59518fa27db2f152654a81af6ad078f84ab2fe1b

  getEmpleadoPorNroDoc(nro_doc): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getEmpleadoPorNroDoc/' + nro_doc, httpOptions);
  }

  getEmpleadosBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getEmpleadosBusqueda/' + texto_busqueda, httpOptions);
  }

  getEmpleadosTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint + '/getEmpleadosTodos/', httpOptions);
  }



}
