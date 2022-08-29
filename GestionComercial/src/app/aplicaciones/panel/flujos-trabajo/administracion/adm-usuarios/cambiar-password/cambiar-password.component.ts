import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UsuariosService } from "src/app/comunes/servicios/usuarios.service";
import { AuthService } from "src/app/comunes/servicios/auth.service";
import { Component, OnInit } from "@angular/core";
import { SnackBarService } from "src/app/core/ui/comunes/servicios/SnackBarService";
import { Router } from "@angular/router";

@Component({
  selector: "app-cambiar-password",
  templateUrl: "./cambiar-password.component.html",
  styleUrls: ["./cambiar-password.component.scss"],
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPassForm: FormGroup;
  nomb_usr: string;

  constructor(
    private SrvUsuarios: UsuariosService,
    private SrvAuth: AuthService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.cambiarPassForm = this.formBuilder.group({
      nombre_usuario: ["", Validators.compose([])],
      oldpassword: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      newpassword: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      newpassword2: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  ngOnInit() {
    this.nomb_usr = localStorage.getItem("roma_usuario");
    this.cambiarPassForm.controls.nombre_usuario.setValue(this.nomb_usr);
  }

  guardar() {
    let viejapass = this.cambiarPassForm.controls.oldpassword.value;
    let nuevapass = this.cambiarPassForm.controls.newpassword.value;
    let nuevapass2 = this.cambiarPassForm.controls.newpassword2.value;
    let usuario = localStorage.getItem("roma_usuario");

    if (this.cambiarPassForm.valid) {
      this.SrvUsuarios.validarPassVieja(usuario, viejapass).subscribe(
        (response) => {
          console.log({ "SrvUsuarios.validarPassVieja": response });
          var cast: any = response.body;
          if (response.status == 200 && cast.permitir_acceso == true) {
            if (nuevapass === nuevapass2) {
              this.SrvUsuarios.cambiarPassword(usuario, nuevapass).subscribe(
                (response) => {
                  console.log({ "SrvUsuarios.cambiarPassword": response });
                  var cast: any = response.body;
                  console.log({ cast: cast });
                  this.snackBar.mostrarMensaje(
                    "La contrase\u00f1a se cambió exitosamente"
                  );
                  localStorage.clear();
                  this.router.navigate(["login"]);
                }
              );
            } else {
              this.snackBar.mostrarMensaje("Las contraseñas no coinciden.");
              document.getElementById("nuevo_pass").focus();
            }
          } else {
            this.snackBar.mostrarMensaje("El password actual no es correcto.");
            document.getElementById("vieja_pass").focus();
          }
        }
      );
    } else {
      this.snackBar.mostrarMensaje("Hay errores en los datos ingresados");
    }
  }
}
