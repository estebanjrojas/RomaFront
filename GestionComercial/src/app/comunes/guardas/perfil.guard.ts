import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../servicios/auth.service";
@Injectable({
  providedIn: "root",
})
export class PerfilGuard implements CanActivate {
  perfilesUsuario = [];
  perfilesNecesariosMenu = [];
  menu = "";

  constructor(private srvAuth: AuthService) {
    this.menu = this.srvAuth.getMenuUsuarioSesion();
    this.perfilesUsuario = this.srvAuth.leerPerfiles().perfiles;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const menuCompleto = JSON.parse(this.menu).menu;
    menuCompleto.forEach((opcionMenu) =>
      this.buscarPerfilesNecesariosMenu(opcionMenu, state.url)
    );
    let tienePerfilNecesario = false;
    this.perfilesNecesariosMenu.forEach((perfilNecesario) => {
      if (this.perfilesUsuario.includes(perfilNecesario)) {
        tienePerfilNecesario = true;
        return;
      }
    });

    const permitirAcceso =
      tienePerfilNecesario || this.perfilesNecesariosMenu.length === 0;
    return permitirAcceso;
  }

  buscarPerfilesNecesariosMenu(objeto, urlBuscar) {
    if (urlBuscar === objeto.menu_ruta) {
      this.perfilesNecesariosMenu = objeto.perfiles;
    }
    if (Array.isArray(objeto.menu_hijo)) {
      objeto.menu_hijo.forEach((hijo) =>
        this.buscarPerfilesNecesariosMenu(hijo, urlBuscar)
      );
    }
  }
}
