import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('tk_acceso')
    }
  )
};

const apiUrl = "http://192.168.1.44:3000";

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  
  constructor(private http: HttpClient) { }
  


  getEmpleadoPorNroDoc(nro_doc): Observable<any> {
    return this.http.get(apiUrl+'/getEmpleadoPorNroDoc/'+nro_doc, httpOptions);
  }
}
