import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { UsuarioSesion } from '../modelos/UsuarioSesion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  miUsuarioSesion: UsuarioSesion = this.inicializarUsuarioSesion();

  constructor(private http: HttpClient) {}

  solicitarAccesoUsuario(usuario, password){
    return this.http.get(environment.apiEndpoint+'/solicitarAccesoUsuario/'+usuario+'/'+password, {observe:'response'});
  }

  setUsuarioSesion(nombre_usuario: string, token: string, debug: number, menu: string){
    this.miUsuarioSesion.nombre_usuario = nombre_usuario;
    localStorage.setItem('roma_usuario', nombre_usuario);
    this.miUsuarioSesion.tk_acceso = token;
    localStorage.setItem('roma_acceso', token);
    this.miUsuarioSesion.debug = debug;
    localStorage.setItem('roma_debug', debug.toString());
    this.miUsuarioSesion.menu = menu;
    localStorage.setItem('roma_menu', menu);
  }

  setUsuarioSesionObj(obj_usuario: UsuarioSesion){
    this.miUsuarioSesion = obj_usuario;
    localStorage.setItem('roma_usuario', obj_usuario.nombre_usuario);
    localStorage.setItem('roma_acceso', obj_usuario.tk_acceso);
    localStorage.setItem('roma_debug', obj_usuario.debug.toString());
    localStorage.setItem('roma_menu', obj_usuario.menu);
  }

  inicializarUsuarioSesion() {
    if(localStorage.getItem('roma_usuario')==undefined || localStorage.getItem('roma_usuario')==''){
      return {
        nombre_usuario: '',
        tk_acceso: '',
        debug: 0,
        menu: ''
      } 
    } else {
      return {
        nombre_usuario: localStorage.getItem('roma_usuario'),
        tk_acceso: localStorage.getItem('roma_acceso'),
        debug: parseInt(localStorage.getItem('roma_debug')),
        menu: localStorage.getItem('roma_menu')
      } 
    }
  }

  setDebug(debug){
    debug == (debug != undefined && debug != '')? debug : 0;
    this.miUsuarioSesion.debug = parseInt(debug);
    localStorage.setItem('roma_debug', debug.toString());
  }

  getNombreUsuarioSesion() {
    return this.miUsuarioSesion.nombre_usuario;
  }

  getTokenUsuarioSesion(){
    return this.miUsuarioSesion.tk_acceso;
  }

  getDebugUsuarioSesion(){
    return this.miUsuarioSesion.debug;
  }

  getMenuUsuarioSesion() {
    return this.miUsuarioSesion.menu;
  }

  getUsuarioSesion() {
    return this.miUsuarioSesion;
  }

  setToken(token) {
    localStorage.setItem('roma_acceso', token);
    this.miUsuarioSesion.tk_acceso = token;
  }

  getToken() {
    return this.miUsuarioSesion.tk_acceso;
  }


}
