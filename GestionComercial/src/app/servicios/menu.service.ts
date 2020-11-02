import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu(usuario){
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('roma_acceso')
        }
      )
    };
    return this.http.get(environment.apiEndpoint+'/getMenuUsuario/'+usuario, httpOptions);
  }
}
