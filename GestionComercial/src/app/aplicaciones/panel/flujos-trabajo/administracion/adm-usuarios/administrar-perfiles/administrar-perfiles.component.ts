import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TabgralService } from "../../../../../../comunes/servicios/tabgral.service";
import { EmpleadosService } from "../../../../../../comunes/servicios/empleados.service";
import { UsuariosService } from "../../../../../../comunes/servicios/usuarios.service";
import { Component, OnInit } from "@angular/core";
import { Empleados } from "src/app/comunes/interfaces/Empleados";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-administrar-perfiles",
  templateUrl: "./administrar-perfiles.component.html",
  styleUrls: ["./administrar-perfiles.component.scss"],
})
export class AdministrarPerfilesComponent implements OnInit {
  perfilesForm: FormGroup;
  nomb_usr: string;

  empleados: Empleados = new Empleados();
  perfilesAsignados = new Array<Perfiles>();
  perfilesSinAsignar = new Array<Perfiles>();

  constructor(
    private formBuilder: FormBuilder,
    private SrvTabgral: TabgralService,
    private SrvEmpleados: EmpleadosService,
    private SrvUsuarios: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.perfilesForm = this.formBuilder.group({
      empleado: ["", Validators.compose([])],
      id_empleado: ["", Validators.compose([])],
      id_usuario: ["", Validators.compose([])],
      chk_debug: [false, Validators.compose([])],
      nomb_usr: ["", Validators.compose([])],
    });
  }

  ngOnInit() {
    this.nomb_usr = localStorage.getItem("roma_usuario");
    this.perfilesForm.controls.nomb_usr.setValue(this.nomb_usr);
    this.route.params.subscribe((params) => {
      this.perfilesForm.controls.id_empleado.setValue(params.empleados_id);
      console.log(params);
    });

    this.obtenerEmpleado();
    this.agregarArregloTabla();
  }

  obtenerEmpleado() {
    var id_empleado = this.perfilesForm.controls.id_empleado.value;
    this.SrvUsuarios.getDatosUsuariosCargados(id_empleado).subscribe((resp) => {
      let respuesta: any = resp;
      console.log({ "SrvUsuarios.getDatosUsuariosCargados": respuesta });
      this.empleados.descripcion = respuesta[0].nomb_usr;
      this.perfilesForm.controls.id_usuario.setValue(respuesta[0].usuario_id);
    });
  }

  agregarArregloTabla() {
    let id_empleado = this.perfilesForm.controls.id_empleado.value;
    this.SrvUsuarios.getPerfilesAsignados(id_empleado).subscribe(
      (respuesta) => {
        console.log({ "SrvUsuarios.getPerfilesAsignados": respuesta });
        let cast: any = respuesta;

        for (let resp of cast)
          this.perfilesAsignados.push({
            id: resp.id,
            nombre: resp.nombre,
            descripcion: resp.descripcion,
          });
        console.log("Perfiles" + this.perfilesAsignados[0].nombre);
      }
    );

    this.SrvUsuarios.getPerfilesSinAsignar(id_empleado).subscribe(
      (respuesta) => {
        console.log({ "SrvUsuarios.getPerfilesSinAsignar": respuesta });
        let cast: any = respuesta;

        for (let resp of cast)
          this.perfilesSinAsignar.push({
            id: resp.id,
            nombre: resp.nombre,
            descripcion: resp.descripcion,
          });
      }
    );
  }

  borrarFila(value) {
    var array = this.perfilesAsignados;
    this.perfilesSinAsignar.push({
      id: array[0].id,
      nombre: array[0].nombre,
      descripcion: array[0].descripcion,
    });
    array.splice(value, 1);
  }

  agregarFila(value) {
    var array = this.perfilesSinAsignar;
    this.perfilesAsignados.push({
      id: array[0].id,
      nombre: array[0].nombre,
      descripcion: array[0].descripcion,
    });
    array.splice(value, 1);
  }

  guardar() {
    let usuario_id = this.perfilesForm.controls.id_usuario.value;
    let empleados_id = this.perfilesForm.controls.id_empleado.value;

    if (this.perfilesForm.valid) {
      console.log(JSON.stringify(this.perfilesForm.value));
      this.SrvUsuarios.deletePerfiles(usuario_id).subscribe((respuesta) => {
        console.log({ "SrvUsuarios.deletePerfiles": respuesta });
        let cast: any = respuesta;

        for (let caract of this.perfilesAsignados) {
          this.SrvUsuarios.insertPerfilesAsignados(
            caract,
            usuario_id
          ).subscribe((resp) => {
            console.log({ "SrvUsuarios.insertPerfilesAsignados": resp });
            this.toastr.success("Caracteristicas cargadas exitosamente");
          });
        }
        this.toastr.success("Los perfiles se han CARGADO Exitosamente");
        this.router.navigate(["usuarios/cargar-usuarios/" + empleados_id]);
      });
    } else {
      this.perfilesForm.getError;
      console.log(this.perfilesForm);
    }
  }
}

interface Perfiles {
  id: number;
  nombre: string;
  descripcion: string;
}
