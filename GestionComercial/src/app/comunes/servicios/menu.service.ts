import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { tap, map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class MenuService {
  constructor(private http: HttpClient, private Auth: AuthService) {}

  getMenu(usuario) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      environment.apiEndpoint + "/getMenuUsuario/" + usuario,
      httpOptions
    );
  }

  getPerfilesCodificadosMenu(rutaMenu) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(
      `${
        environment.apiEndpoint
      }/getPerfilesCodificadosMenu/${rutaMenu.replaceAll("/", "")}`,
      httpOptions
    );
  }

  comprobarPerfilesUsuarioMenu(rutaMenu) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };

    const perfilesUsuario = this.Auth.leerPerfiles().perfiles;
    let coincidencias = [];
    const request = async () =>
      await this.http
        .get(
          `${
            environment.apiEndpoint
          }/getPerfilesCodificadosMenu/${rutaMenu.replaceAll("/", "")}`,
          httpOptions
        )
        .subscribe((perfilesNecesariosMenu: any[]) => {
          coincidencias = perfilesUsuario.filter((perfilUsuario) =>
            perfilesNecesariosMenu
              .map((perfilMenu) => perfilMenu.perfiles)
              .includes(perfilUsuario)
          );
          const tienePerfilNecesario = coincidencias.length > 0;
          return tienePerfilNecesario;
        });

    return request;
  }
}
