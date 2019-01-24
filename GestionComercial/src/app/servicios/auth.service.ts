import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { console.log('Servicio Auth Works...');}

  solicitarAccesoUsuario(usuario, password){
    return this.http.get('http://192.168.1.44:3000/solicitarAccesoUsuario/'+usuario+'/'+password);
  }
}
