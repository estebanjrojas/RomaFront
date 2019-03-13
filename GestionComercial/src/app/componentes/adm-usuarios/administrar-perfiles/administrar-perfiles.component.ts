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

  empleados: Empleados = new Empleados();
  perfilesAsignados = new Array<Perfiles>();
  perfilesSinAsignar = new Array<Perfiles>();

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
      id_empleado: [
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
      this.perfilesForm.controls.id_empleado.setValue(params.empleados_id);
      console.log(params);
    });

    this.obtenerEmpleado();
    this.agregarArregloTabla();
  }


  obtenerEmpleado() {
    var id_empleado = this.perfilesForm.controls.id_empleado.value;
    this.SrvUsuarios.getDatosUsuariosCargados(id_empleado).subscribe(resp => {
      let respuesta: any = resp;
      console.log({ "SrvUsuarios.getDatosUsuariosCargados": respuesta });
      this.empleados.descripcion = respuesta[0].nomb_usr;
      console.log("Datos guardados: " + this.empleados.descripcion);
      console.log("Datos guardados: " + respuesta[0].nomb_usr);

    });
  }


  agregarArregloTabla() {
    let id_empleado = this.perfilesForm.controls.id_empleado.value;
    this.SrvUsuarios.getPerfilesAsignados(id_empleado).subscribe(respuesta => {
      console.log({ "SrvUsuarios.getPerfilesAsignados": respuesta });
      let cast: any = respuesta;

      for (let resp of cast)
        this.perfilesAsignados.push({
          'id': resp.id,
          'nombre': resp.nombre,
          'descripcion': resp.descripcion,
        });
        console.log("Perfiles"+ this.perfilesAsignados[0].nombre);
    });

    this.SrvUsuarios.getPerfilesSinAsignar(id_empleado).subscribe(respuesta => {
      console.log({ "SrvUsuarios.getPerfilesSinAsignar": respuesta });
      let cast: any = respuesta;

      for (let resp of cast)
        this.perfilesSinAsignar.push({
          'id': resp.id,
          'nombre': resp.nombre,
          'descripcion': resp.descripcion,
        });
        console.log("Perfiles"+ this.perfilesSinAsignar[0].nombre);
    });

    
  }



}


interface Perfiles {
  id: number,
  nombre: string,
  descripcion: string

}