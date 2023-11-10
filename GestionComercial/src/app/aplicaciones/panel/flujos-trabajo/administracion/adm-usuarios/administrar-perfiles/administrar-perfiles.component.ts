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
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

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
  jsonFinal: { usuarioId: any; empleadoId: any; perfiles: Perfiles[] };
  usuarioId: any;

  constructor(
    private formBuilder: FormBuilder,
    private SrvTabgral: TabgralService,
    private SrvEmpleados: EmpleadosService,
    private SrvUsuarios: UsuariosService,
    private snackBar2: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
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
      this.usuarioId = params.usuario_id;
    });

    this.obtenerEmpleado();
    this.agregarArregloTabla();
  }

  obtenerEmpleado() {
    // var id_empleado = this.perfilesForm.controls.id_empleado.value;
    this.SrvUsuarios.getDatosUsuariosCargados(this.usuarioId).subscribe(
      (resp) => {
        console.log({ "SrvUsuarios.getDatosUsuariosCargados": resp });
        let respuesta: any = resp;
        this.empleados.descripcion = respuesta[0].nomb_usr;
        this.perfilesForm.controls.id_usuario.setValue(respuesta[0].usuario_id);
      }
    );
  }

  agregarArregloTabla() {
    let id_empleado = this.perfilesForm.controls.id_empleado.value;
    this.SrvUsuarios.getPerfilesAsignados(id_empleado).subscribe(
      (respuesta) => {
        let cast: any = respuesta;

        for (let resp of cast)
          this.perfilesAsignados.push({
            id: resp.id,
            nombre: resp.nombre,
            descripcion: resp.descripcion,
          });
      }
    );

    this.SrvUsuarios.getPerfilesSinAsignar(id_empleado).subscribe(
      (respuesta) => {
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

  guardarV2() {
    let id_empleado = this.perfilesForm.controls.id_empleado.value;
    this.jsonFinal = {
      usuarioId: this.usuarioId,
      empleadoId: id_empleado,
      perfiles: this.perfilesAsignados,
    };
    if (this.perfilesForm.valid) {
      this.SrvUsuarios.updatePerfiles(this.jsonFinal).subscribe(
        (respuesta) => {
          let cast: any = respuesta;
        },
        (err) => {
          this.mostrarMensajeError("Ocurrió un error. " + err);
        },
        () => {
          this.router.navigate([
            "panel/usuarios/cargar-usuarios/" + this.usuarioId,
          ]);
          this.mostrarMensajeInformativo(
            "Se han actualizado los perfiles correctamente. "
          );
        }
      );
    } else {
      this.mostrarMensajeError("Hay campos obligatorios sin completar.");
    }
  }

  guardar() {
    let usuario_id = this.perfilesForm.controls.id_usuario.value;
    let empleados_id = this.perfilesForm.controls.id_empleado.value;

    if (this.perfilesForm.valid) {
      this.SrvUsuarios.deletePerfiles(usuario_id).subscribe((respuesta) => {
        let cast: any = respuesta;

        for (let caract of this.perfilesAsignados) {
          this.SrvUsuarios.insertPerfilesAsignados(
            caract,
            usuario_id
          ).subscribe(() => {
            alert("Caracteristicas cargadas exitosamente");
          });
        }
        alert("Los perfiles se han CARGADO Exitosamente");
        //this.router.navigate([
        //  "panel/usuarios/cargar-usuarios/" + empleados_id,
        //]);
      });
    } else {
      this.mostrarMensajeError("Hay campos obligatorios sin completar.");
      this.perfilesForm.getError;
    }
  }

  mostrarMensajeError(mensaje: string) {
    const config = new MatSnackBarConfig();
    config.duration = 15000;
    config.panelClass = ["error-alert"];
    this.snackBar2.open(`${mensaje}`, "Cerrar", config);
  }

  mostrarMensajeInformativo(mensaje: string) {
    const config = new MatSnackBarConfig();
    config.duration = 15000;
    config.panelClass = ["info-alert"];
    this.snackBar2.open(`${mensaje}`, "Cerrar", config);
  }
}

interface Perfiles {
  id: number;
  nombre: string;
  descripcion: string;
}
