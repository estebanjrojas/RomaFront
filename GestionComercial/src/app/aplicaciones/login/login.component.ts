import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../comunes/servicios/auth.service";
import { MenuService } from "../../comunes/servicios/menu.service";
import { Router } from "@angular/router";
import { UsuarioSesion } from "../../comunes/interfaces/UsuarioSesion";
import { LoginPresenter } from "./login.presenter";

@Component({
  selector: "app-login-ui",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [LoginPresenter],
})
export class LoginComponent implements OnInit {
  miUsuarioSesion: UsuarioSesion;
  submitted: boolean = false;
  acceso: boolean = false;
  anioActual: number = new Date().getFullYear();
  @Input() public usuarioIngresado: Array<any>;
  @Output() public readonly usuarioInicia: EventEmitter<any>;

  constructor(
    public readonly loginPresenter: LoginPresenter,
    private router: Router,
    private Auth: AuthService,
    private SrvMenu: MenuService
  ) {
    this.usuarioInicia = new EventEmitter();
  }

  ngOnInit() {
    this.miUsuarioSesion = this.Auth.inicializarUsuarioSesion();
  }

  get f() {
    return this.loginPresenter.form.controls;
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
        this.router.navigate(["home"]);
      }
    );
  }

  loginUser() {
    this.usuarioInicia.emit(this.loginPresenter.getUsuarioIngresado());
  }
}
