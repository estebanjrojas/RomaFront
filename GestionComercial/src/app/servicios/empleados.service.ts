import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import { Empleados } from '../modelos/Empleados';
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
export class EmpleadosService {

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

  getEmpleadoPorNroDoc(nro_doc): Observable<any> {
    return this.http.get(environment.apiEndpoint+'/getEmpleadoPorNroDoc/'+nro_doc, httpOptions);
  }

  getEmpleadosBusqueda(texto_busqueda): Observable<any> {
    return this.http.get(environment.apiEndpoint+'/getEmpleadosBusqueda/'+texto_busqueda, httpOptions);
  }

  getEmpleadosTodos(): Observable<any> {
    return this.http.get(environment.apiEndpoint+'/getEmpleadosTodos/', httpOptions);
  }



}
