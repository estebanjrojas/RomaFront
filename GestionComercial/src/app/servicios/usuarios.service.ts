import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  informacionPersonalUsuario(usuario){
    return this.http.get('http://192.168.1.46:3000/getInformacionPersonalUsuario/'+usuario);
  }

  getDatosUsuario(usuario){
    return this.http.get('http://192.168.1.46:3000/getDatosUsuario/'+usuario);
  }
}
