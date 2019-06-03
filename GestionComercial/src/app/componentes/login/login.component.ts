import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  submitted: boolean = false;
  acceso: boolean = false;
  mostrarNotifError = false;
  textoNotifError = "";
  constructor(private router: Router
    , private Auth: AuthService
    , private usuario_serv: UsuariosService
    , private toastr: ToastrService
    , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      txtUsuario: ['', Validators.required],
      txtPassword: ['', Validators.required]
    });
  }

  get f() { return this.formulario.controls; }

  loginUser() {

    try {
      if(this.formulario.valid) {
        const usuario =  this.formulario.controls.txtUsuario.value;
        const contrasenia = this.formulario.controls.txtPassword.value;
  
        this.Auth.solicitarAccesoUsuario(usuario, contrasenia).subscribe(response => {
         console.log({"Auth.solicitarAccesoUsuario" : response});
          var cast: any = response.body;
          console.log({"cast" : cast});
          if (response.status == 200 && cast.respuesta != undefined) {
       
            let usuario = String(this.formulario.controls.txtUsuario.value);
            localStorage.setItem('roma_usuario', usuario);
            localStorage.setItem('roma_acceso', String(cast.respuesta));
            
            this.router.navigate(['empleados/busqueda-empleados']);
          } 
          if (response.status == 200 && cast.respuesta == undefined) {
            this.toastr.error('Datos de Acceso Incorrectos', 'Acceso Denegado', {
              tapToDismiss: true
            });
          }
          if (response.status != 200) {
            let desc_error = 'Ocurri&oacute; un error al intentar conectar con el servidor.<br>';
                desc_error += response.statusText;
            this.toastr.error(desc_error, 'Acceso Denegado', {
              tapToDismiss: true
            });
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
          this.mostrarNotificacionError("Debe ingresar un nombre de usuario y contraseña para continuar");
        } else if(errorUsuario && !errorContrasenia) {
          this.mostrarNotificacionError("Debe ingresar un nombre de usuario valido");
        } else if(!errorUsuario && errorContrasenia) {
          this.mostrarNotificacionError("Debe ingresar la contraseña");
        }

      }
     

    }
    catch(err) {

      this.toastr.error('Ocurri&oacute; un error al conectar el servicio', 'Error de Conexi&oacute;n', {
        tapToDismiss: true
      });
    }

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formulario.invalid) {
      return;
    } 
    else {
        this.loginUser();
    }

  }

  mostrarNotificacionError(mensaje) {
    let contador = 0;
    this.textoNotifError = mensaje;
    this.mostrarNotifError = true;
    const inter = setInterval(() => {
      contador++;
      if(contador>30 && this.mostrarNotifError==true) {
        this.mostrarNotifError=false;
        clearInterval(inter);
      }
    }, 150);
  }

}
