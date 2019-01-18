import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) { }

  selectAllCiudades(): Observable<any> {
    return this.http.get('http://192.168.1.46:3000/selectAllCiudades/');
  }
}
