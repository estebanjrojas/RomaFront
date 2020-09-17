import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  submitted: boolean = false;
  acceso: boolean = false;
  constructor(private router: Router
    , private Auth: AuthService
    , private toastr: ToastrService
    , private formBuilder: FormBuilder
    , private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      txtUsuario: ['', Validators.required],
      txtPassword: ['', Validators.required]
    });
  }

  mostrarMensajeError(mensaje) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['error-alert'];
    this.snackBar.open(`${mensaje}`, 'Cerrar', config);
  }

  mostrarMensajeInformativo(mensaje) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['info-alert'];
    this.snackBar.open(`${mensaje}`, 'Cerrar', config);
  }

  get f() { return this.formulario.controls; }

  loginUser() {

    try {
      let autorizado = false;
      if(this.formulario.valid) {
        const usuario =  this.formulario.controls.txtUsuario.value;
        const contrasenia = this.formulario.controls.txtPassword.value;
  
        this.Auth.solicitarAccesoUsuario(usuario, contrasenia).subscribe(response => {
         //console.log({"Auth.solicitarAccesoUsuario" : response});
          var cast: any = response.body;
          if (response.status == 200 && cast.respuesta != undefined) {
       
            let usuario = String(this.formulario.controls.txtUsuario.value);
            localStorage.setItem('roma_usuario', usuario);
            localStorage.setItem('roma_acceso', String(cast.respuesta));
            autorizado = true;
            
          } 
          if (response.status == 200 && cast.respuesta == undefined) {
            this.mostrarMensajeError('Acceso Denegado. Datos de Acceso Incorrectos');
          }
          if (response.status != 200) {
            let desc_error = 'Ocurri&oacute; un error al intentar conectar con el servidor.<br>';
                desc_error += response.statusText;
                this.mostrarMensajeError(desc_error);
          }
        }, error => {
          this.mostrarMensajeError('Ocurrió un error al solicitar acceso.');
          console.error(error);
        }, ()=> {
          if(autorizado){
            this.router.navigate(['empleados/busqueda-empleados']);
          }
        });

      }
      else {
        const usuario =  this.formulario.controls.txtUsuario.value;
        const contrasenia = this.formulario.controls.txtPassword.value;
        let errorUsuario = false;
        let errorContrasenia = false;
        if(usuario == undefined || usuario=='') {
          errorUsuario = true
        }
        if(contrasenia == undefined || contrasenia=='') {
          errorContrasenia = true;
        }

        if(errorUsuario && errorContrasenia) {
          this.mostrarMensajeError("Debe ingresar un nombre de usuario y contraseña para continuar");
        } else if(errorUsuario && !errorContrasenia) {
          this.mostrarMensajeError("Debe ingresar un nombre de usuario valido");
        } else if(!errorUsuario && errorContrasenia) {
          this.mostrarMensajeError("Debe ingresar la contraseña");
        }

      }
     

    }
    catch(err) {

      this.toastr.error('Ocurri&oacute; un error al conectar el servicio', 'Error de Conexi&oacute;n', {
        tapToDismiss: true
      });
    }

  }


}
