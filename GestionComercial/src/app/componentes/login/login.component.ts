import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { MenuService } from '../../servicios/menu.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UsuarioSesion } from '../../modelos/UsuarioSesion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miUsuarioSesion : UsuarioSesion;
  formulario: FormGroup;
  submitted: boolean = false;
  acceso: boolean = false;
  constructor(private router: Router
    , private Auth: AuthService
    , private toastr: ToastrService
    , private SrvMenu: MenuService
    , private formBuilder: FormBuilder
    , private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.miUsuarioSesion = this.Auth.inicializarUsuarioSesion();
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


  obtenerMenu(usuario){
    this.SrvMenu.getMenu(usuario).subscribe(resp => {
      let cast: any = resp;
      this.miUsuarioSesion.menu = cast.menu;
    }, error => {
      console.error(`Ha ocurrido un error al obtener el menu del usuario: ${error}`);
    }, ()=>{
      this.Auth.setUsuarioSesionObj(this.miUsuarioSesion);
      this.router.navigate(['home']);
      
    })
  }

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
            this.miUsuarioSesion.nombre_usuario = usuario;
            this.miUsuarioSesion.tk_acceso = String(cast.respuesta);
            this.miUsuarioSesion.debug = 0;
            autorizado = true;
            localStorage.setItem('roma_acceso', this.miUsuarioSesion.tk_acceso);
            
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
            this.obtenerMenu(usuario);
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
