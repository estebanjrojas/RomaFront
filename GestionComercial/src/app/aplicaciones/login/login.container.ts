import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { SnackBarService } from "src/app/core/ui/comunes/servicios/SnackBarService";
import { AuthService } from "../../comunes/servicios/auth.service";
import { MenuService } from "../../comunes/servicios/menu.service";
import { UsuarioSesion } from "../../comunes/interfaces/UsuarioSesion";
import { UsuariosService } from "src/app/comunes/servicios/usuarios.service";
@Component({
  selector: "app-login",
  templateUrl: "login.container.html",
})
export class LoginContainer {
  miUsuarioSesion: UsuarioSesion;
  public constructor(
    private router: Router,
    private Auth: AuthService,
    private SrvMenu: MenuService,
    private snackBar: SnackBarService,
    private SrvUsuarios: UsuariosService
  ) {
    this.miUsuarioSesion = this.Auth.inicializarUsuarioSesion();
  }

  public ngOnInit(): void {}

  obtenerPerfiles(usuario) {
    this.SrvUsuarios.getPerfilesCodificados(usuario).subscribe(
      (resp: any) => {
        const listaPerfiles = resp.map((item) => item.perfiles);
        const perfiles: string = JSON.stringify({
          perfiles: listaPerfiles,
        });
        this.miUsuarioSesion.perfiles = perfiles;
        this.Auth.setPerfiles(perfiles);
      },
      (error) =>
        console.error(
          `Ha ocurrido un error al intentar obtener los perfiles del usuario: ${error}`
        ),
      () => {
        this.obtenerMenu(usuario);
      }
    );
  }

  obtenerMenu(usuario) {
    this.SrvMenu.getMenu(usuario).subscribe(
      (resp) => {
        let cast: any = resp;
        this.miUsuarioSesion.menu = cast.menu;
      },
      (error) => {
        console.error(
          `Ha ocurrido un error al obtener el menu del usuario: ${error}`
        );
      },
      () => {
        this.Auth.setUsuarioSesionObj(this.miUsuarioSesion);
        this.router.navigate(["/panel/home"]);
      }
    );
  }

  public onLogin(usuarioIngresado: any) {
    let autorizado = false;
    this.Auth.solicitarAccesoUsuario(
      usuarioIngresado.usuarioIngresado,
      usuarioIngresado.passwordIngresada
    ).subscribe(
      (response) => {
        var cast: any = response.body;
        if (response.status == 200 && cast.respuesta != undefined) {
          const usuario = String(usuarioIngresado.usuarioIngresado);
          this.miUsuarioSesion.nombre_usuario = usuario;
          this.miUsuarioSesion.tk_acceso = String(cast.respuesta);
          this.miUsuarioSesion.debug = 0;
          autorizado = true;
          this.Auth.setToken(String(cast.respuesta));
        }
        if (response.status == 200 && cast.respuesta == undefined) {
          this.snackBar.mostrarMensaje(
            "Acceso Denegado. Datos de Acceso Incorrectos"
          );
        }
        if (response.status != 200) {
          let desc_error =
            "Ocurri&oacute; un error al intentar conectar con el servidor.<br>";
          desc_error += response.statusText;
          this.snackBar.mostrarMensaje(desc_error);
        }
      },
      (error) => {
        this.snackBar.mostrarMensaje("Ocurrió un error al solicitar acceso.");
        console.error(error);
      },
      () => {
        if (autorizado) {
          this.obtenerPerfiles(usuarioIngresado.usuarioIngresado);
        }
      }
    );
  }
}
