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
      this.acceso = cast.autorizado;
      let usuario = String(this.formulario.controls.txtUsuario.value);
      localStorage.setItem('usuario_autenticado', String(this.acceso));
      localStorage.setItem('nomb_usr', usuario);

      if (this.acceso) {
        this.usuario_serv.getDatosUsuario(usuario).subscribe(respuesta => {
          let cast: any = respuesta;
          localStorage.setItem('apellido_usr', cast.apellido);
          localStorage.setItem('nombre_usr', cast.nombre);
          localStorage.setItem('organismo_usr', cast.organismo);
          localStorage.setItem('oficina_usr', cast.oficina_descripcion);
          localStorage.setItem('email_usr', cast.mail);

          this.router.navigate(['empleados/cargar-empleados']);
        });
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
