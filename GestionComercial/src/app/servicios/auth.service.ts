import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  solicitarAccesoUsuario(usuario, password){
    return this.http.get(environment.apiEndpoint+'/solicitarAccesoUsuario/'+usuario+'/'+password, {observe:'response'});
  }
}