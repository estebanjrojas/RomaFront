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

      this.Auth.solicitarAccesoUsuario(this.formulario.controls.txtUsuario.value, this.formulario.controls.txtPassword.value).subscribe(response => {
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




}
