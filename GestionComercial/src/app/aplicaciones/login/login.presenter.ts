import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable()
export class LoginPresenter {
  public form: FormGroup;
  public usuario: FormControl;
  public password: FormControl;

  constructor(private snackBar: MatSnackBar) {
    this.usuario = new FormControl("", Validators.required);
    this.password = new FormControl("", [Validators.required]);

    this.form = new FormGroup({
      usuario: this.usuario,
      password: this.password,
    });
  }
  mostrarMensajeError(mensaje) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ["error-alert"];
    this.snackBar.open(`${mensaje}`, "Cerrar", config);
  }

  public get formEsInvalido() {
    return this.form.invalid;
  }

  public get usuarioEsInvalido() {
    return this.form.get("usuario").invalid;
  }

  public get passwordEsInvalida() {
    return this.form.get("password").invalid;
  }

  public getUsuarioIngresado() {
    let usuarioIngresado: string = this.form.get("usuario").value;
    let passwordIngresada: string = this.form.get("password").value;
    if (!this.formEsInvalido) {
      return {
        usuarioIngresado: usuarioIngresado,
        passwordIngresada: passwordIngresada,
      };
    } else {
      const usuario = this.form.get("usuario").value;
      const contrasenia = this.form.get("password").value;
      let errorUsuario = false;
      let errorContrasenia = false;
      if (usuario == undefined || usuario == "") {
        errorUsuario = true;
      }
      if (contrasenia == undefined || contrasenia == "") {
        errorContrasenia = true;
      }

      if (errorUsuario && errorContrasenia) {
        this.mostrarMensajeError(
          "Debe ingresar un nombre de usuario y contraseña para continuar"
        );
      } else if (errorUsuario && !errorContrasenia) {
        this.mostrarMensajeError("Debe ingresar un nombre de usuario valido");
      } else if (!errorUsuario && errorContrasenia) {
        this.mostrarMensajeError("Debe ingresar la contraseña");
      }
    }
  }
}
