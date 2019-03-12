import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabgralService } from '../../../servicios/tabgral.service';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/modelos/Empleados';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-administrar-perfiles',
  templateUrl: './administrar-perfiles.component.html',
  styleUrls: ['./administrar-perfiles.component.css']
})
export class AdministrarPerfilesComponent implements OnInit {

  perfilesForm: FormGroup;
  nomb_usr: string;

  constructor(private formBuilder: FormBuilder
    , private SrvTabgral: TabgralService
    , private SrvEmpleados: EmpleadosService
    , private SrvUsuarios: UsuariosService
    , private route: ActivatedRoute
    , private router: Router
    , private toastr: ToastrService) { 
    this.perfilesForm = this.formBuilder.group({
      empleado: [
        '', Validators.compose([
        ])
      ],
      nombre_usuario: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      id_usuario: [
        '', Validators.compose([

        ])
      ],
      chk_debug: [
        false, Validators.compose([
        ])
      ],
      nomb_usr: [
        '', Validators.compose([
        ])
      ]
    });
  }

  ngOnInit() {
    this.nomb_usr = localStorage.getItem('roma_usuario');
    this.perfilesForm.controls.nomb_usr.setValue(this.nomb_usr);
    this.route.params.subscribe(params => {
      this.perfilesForm.controls.id_usuario.setValue(params.id_usuario);
      console.log(params);
    });
  }

}
