import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabgralService } from '../../../servicios/tabgral.service';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/modelos/Empleados';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cargar-usuarios',
  templateUrl: './cargar-usuarios.component.html',
  styleUrls: ['./cargar-usuarios.component.css']
})
export class CargarUsuariosComponent implements OnInit {

  //Instancias
  usuariosForm: FormGroup;
  empleadosInter = new Array<EmpleadosInterface>();
  nomb_usr: string;


  constructor(private formBuilder: FormBuilder
    , private SrvTabgral: TabgralService
    , private SrvEmpleados: EmpleadosService
    , private SrvUsuarios: UsuariosService
    , private route: ActivatedRoute
    , private router: Router
    , private toastr: ToastrService) {
    this.usuariosForm = this.formBuilder.group({
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
    this.usuariosForm.controls.nomb_usr.setValue(this.nomb_usr);
    this.route.params.subscribe(params => {
      this.usuariosForm.controls.id_usuario.setValue(params.id_usuario);
      console.log(params);
    });

    //Llenado combo Empleados
    this.SrvEmpleados.getEmpleadosSinUsuario().subscribe(respuesta => {
      console.log({ "SrvEmpleados.getEmpleadosSinUsuario()": respuesta });
      let cast: any = respuesta;
      //console.log(Object.keys(respuesta).length === 0);
      if (!(Object.entries(respuesta).length === 0)) {
        for (var i = 0; i < cast.length; i++) {
          let rel: EmpleadosInterface = { empleados_id: 0, personas_id: 0, nombre: "", apellido: "" };
          rel.empleados_id = cast[i].empleados_id;
          rel.personas_id = cast[i].personas_id;
          rel.nombre = cast[i].nombre;
          rel.apellido = cast[i].apellido;
          this.empleadosInter.push(rel);

        }
      } else {
        let rel: EmpleadosInterface = { empleados_id: 0, personas_id: 0, nombre: "", apellido: "" };
        rel.empleados_id = 0;
        rel.nombre = "No existen empleados sin un nombre de usuario";

        this.empleadosInter.push(rel);
        this.usuariosForm.controls.empleado.disable();
        this.usuariosForm.controls.empleado.setValue(0);

      }
    });
  }


  modificarUsuarios() {
    let id_usuario = this.usuariosForm.controls.id_usuario.value;
    console.log("ID que traigo: " + id_usuario);
    if (id_usuario != null || id_usuario != undefined) {
      console.log("paso por aqui");
      this.SrvUsuarios.getDatosUsuariosCargados(id_usuario).subscribe(resp => {
        let respuesta: any = resp;
        console.log({ "SrvUsuarios.getDatosUsuariosCargados": respuesta });

        this.usuariosForm.patchValue({
          empleado: respuesta[0].codigo,
          nombre_usuario: respuesta[0].nombre,
          chk_debug: respuesta[0].descripcion
        });
        console.log("Tipo Producto: " + this.usuariosForm.controls.tipo.value);
      });
    }
  }



  //Guardar Nuevo Usuario
  guardar() {

    let id_usuario = this.usuariosForm.controls.id_usuario.value;

    if (id_usuario == null || id_usuario == undefined) {
      if (this.usuariosForm.valid) {
        console.log(JSON.stringify(this.usuariosForm.value));
        console.log(JSON.stringify(this.empleadosInter));
        this.SrvUsuarios.insertUsuarioReturnId(this.usuariosForm.value, this.empleadosInter).subscribe(respuesta => {
          console.log({ "SrvUsuarios.insertUsuarioReturnId": respuesta });
          this.toastr.success('El Usuario se ha CARGADO Exitosamente');
          this.usuariosForm.reset();
        });
      }
      else {
        this.usuariosForm.getError;
        console.log("Formulario: "+this.usuariosForm + ", Array: "+ this.empleadosInter);
      }
    } else {
      //Modificar Usuario
      if (this.usuariosForm.valid) {
        console.log(JSON.stringify(this.usuariosForm.value));
        this.SrvUsuarios.actualizarDatosUsuarios(this.usuariosForm.value).subscribe(respuesta => {
          console.log({ "SrvAvisos.actualizarDatosUsuarios": respuesta });

          this.toastr.success('El usuario se ha ACTUALIZADO Exitosamente');
          this.usuariosForm.reset();
          this.router.navigate(['usuarios/busqueda-usuarios']);

        });
      } else {
        this.usuariosForm.getError;
        console.log(this.usuariosForm);
      }

    }
  }


  administrarPerfiles(){
    this.router.navigate(['usuarios/busqueda-usuarios/'+this.empleadosInter[0].empleados_id]);
  }



}



interface EmpleadosInterface {
  empleados_id: number;
  personas_id: number;
  apellido: string;
  nombre: string;
}

