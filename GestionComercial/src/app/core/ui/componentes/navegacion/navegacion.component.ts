import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuariosService } from "src/app/comunes/servicios/usuarios.service";
import { AuthService } from "src/app/comunes/servicios/auth.service";
import { isArray } from "util";

@Component({
  selector: "app-navegacion",
  templateUrl: "./navegacion.component.html",
  styleUrls: ["./navegacion.component.scss"],
})
export class NavegacionComponent implements OnInit {
  datos_usuario: any;
  menuArray: any = [];

  constructor(
    private router: Router,
    private SrvUsuarios: UsuariosService,
    private Auth: AuthService
  ) {}

  ngOnInit() {
    let usuario = this.Auth.getNombreUsuarioSesion();
    let menuLS = this.Auth.getMenuUsuarioSesion();
    this.menuArray = JSON.parse(menuLS).menu;
    /*
    this.menuArray = this.menuArray.map(menu => {
      return {...menu, tiene_ruta: this.opcionMenuTieneRuta(menu), tiene_hijos: this.opcionMenuTieneHijos(menu)};
    })*/

    this.SrvUsuarios.getDatosUsuario(usuario).subscribe((respuesta) => {
      let cast = respuesta;
      this.datos_usuario = cast[0];
      // console.log(this.datos_usuario);
      this.Auth.setDebug(this.datos_usuario.debug);

      if (this.Auth.getDebugUsuarioSesion() == 1) {
        console.log({ "SrvUsuarios.getDatosUsuario": this.datos_usuario });
      }
    });
  }

  opcionMenuTieneRuta(menuOpcion) {
    return menuOpcion.menu_ruta === null ||
      menuOpcion.menu_ruta === undefined ||
      menuOpcion.menu_ruta === "" ||
      menuOpcion.menu_ruta === "null"
      ? false
      : true;
  }

  opcionMenuTieneHijos(menuOpcion) {
    return menuOpcion.menu_hijo != null &&
      menuOpcion.menu_hijo != undefined &&
      menuOpcion.menu_hijo != "null" &&
      menuOpcion.menu_hijo != "" &&
      menuOpcion.menu_hijo.length > 0
      ? true
      : false;
  }

  cerrarSession() {
    localStorage.clear();
    this.Auth.setUsuarioSesion("", "", 0, "");
    this.router.navigate([""]);
  }
}
