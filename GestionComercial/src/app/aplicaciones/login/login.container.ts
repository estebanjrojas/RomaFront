import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { SnackBarService } from "src/app/core/ui/comunes/servicios/SnackBarService";
import { AuthService } from "../../comunes/servicios/auth.service";
import { MenuService } from "../../comunes/servicios/menu.service";
import { UsuarioSesion } from "../../comunes/interfaces/UsuarioSesion";

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
    private snackBar: SnackBarService
  ) {
    this.miUsuarioSesion = this.Auth.inicializarUsuarioSesion();
  }

  public ngOnInit(): void {}

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
        //console.log({"Auth.solicitarAccesoUsuario" : response});
        var cast: any = response.body;
        if (response.status == 200 && cast.respuesta != undefined) {
          let usuario = String(usuarioIngresado.usuarioIngresado);
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
          this.obtenerMenu(usuarioIngresado.usuarioIngresado);
        }
      }
    );
  }
}
