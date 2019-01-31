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
    this.Auth.solicitarAccesoUsuario(this.formulario.controls.txtUsuario.value, this.formulario.controls.txtPassword.value).subscribe(response => {
      var cast: any = response;
      if (cast.respuesta!=undefined) {
   
        let usuario = String(this.formulario.controls.txtUsuario.value);
        localStorage.setItem('roma_usuario', usuario);
        localStorage.setItem('tk_acceso', String(cast.respuesta));

        this.router.navigate(['empleados/cargar-empleados']);
      } else {
        this.toastr.error('Datos de Acceso Incorrectos', 'Acceso Denegado', {
          tapToDismiss: true
        });
      }
    });

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formulario.invalid) {
      return;
    } else {
      this.loginUser();
    }

  }




}
