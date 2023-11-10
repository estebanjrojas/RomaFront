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

@Component({
  selector: "app-cargar-usuarios",
  templateUrl: "./cargar-usuarios.component.html",
  styleUrls: ["./cargar-usuarios.component.scss"],
})
export class CargarUsuariosComponent implements OnInit {
  //Instancias
  usuariosForm: FormGroup;
  empleadosInter = new Array<EmpleadosInterface>();
  nomb_usr: string;

  constructor(
    private formBuilder: FormBuilder,
    private SrvTabgral: TabgralService,
    private SrvEmpleados: EmpleadosService,
    private SrvUsuarios: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuariosForm = this.formBuilder.group({
      empleado: ["", Validators.compose([])],
      nombre_usuario: ["", Validators.compose([Validators.required])],
      id_usuario: [0, Validators.compose([])],
      chk_debug: [false, Validators.compose([])],
      nomb_usr: ["", Validators.compose([])],
    });
  }

  ngOnInit() {
    this.nomb_usr = localStorage.getItem("roma_usuario");
    this.usuariosForm.controls.nomb_usr.setValue(this.nomb_usr);
    this.route.params.subscribe((params) => {
      this.usuariosForm.controls.id_usuario.setValue(params.usuarios_id);
    });

    this.modificarUsuarios();
  }

  modificarUsuarios() {
    let id_usuario = this.usuariosForm.controls.id_usuario.value;
    if (id_usuario != null || id_usuario != undefined) {
      this.SrvUsuarios.getDatosUsuariosCargados(id_usuario).subscribe(
        (resp) => {
          let respuesta: any = resp;
          this.usuariosForm.patchValue({
            empleado: respuesta[0].codigo,
            nombre_usuario: respuesta[0].nomb_usr,
            chk_debug: respuesta[0].descripcion,
          });

          if (!(Object.entries(respuesta).length === 0)) {
            for (var i = 0; i < respuesta.length; i++) {
              let rel: EmpleadosInterface = {
                empleados_id: 0,
                personas_id: 0,
                nombre: "",
                apellido: "",
              };
              rel.empleados_id = respuesta[i].empleados_id;
              rel.personas_id = respuesta[i].personas_id;
              rel.nombre = respuesta[i].nombre_completo;
              this.empleadosInter.push(rel);
            }
          }
          this.usuariosForm.controls.empleado.setValue(
            this.empleadosInter[0].empleados_id
          );
        }
      );
    } else {
      this.SrvEmpleados.getEmpleadosSinUsuario().subscribe((respuesta) => {
        let cast: any = respuesta;
        if (!(Object.entries(respuesta).length === 0)) {
          for (var i = 0; i < cast.length; i++) {
            let rel: EmpleadosInterface = {
              empleados_id: 0,
              personas_id: 0,
              nombre: "",
              apellido: "",
            };
            rel.empleados_id = cast[i].empleados_id;
            rel.personas_id = cast[i].personas_id;
            rel.nombre = cast[i].nombre_completo;
            this.empleadosInter.push(rel);
          }
        } else {
          let rel: EmpleadosInterface = {
            empleados_id: 0,
            personas_id: 0,
            nombre: "",
            apellido: "",
          };
          rel.empleados_id = 0;
          rel.nombre = "No existen empleados sin un nombre de usuario";

          this.empleadosInter.push(rel);
          this.usuariosForm.controls.empleado.disable();
          this.usuariosForm.controls.empleado.setValue(0);
        }
      });
    }
  }

  //Guardar Nuevo Usuario
  guardar() {
    let id_usuario = this.usuariosForm.controls.id_usuario.value;

    if (id_usuario == null || id_usuario == undefined) {
      if (this.usuariosForm.valid) {
        this.SrvUsuarios.insertUsuarioReturnId(
          this.usuariosForm.value,
          this.empleadosInter
        ).subscribe(() => {
          alert("El Usuario se ha CARGADO Exitosamente");
          this.usuariosForm.reset();
        });
      } else {
        this.usuariosForm.getError;
      }
    } else {
      //Modificar Usuario
      if (this.usuariosForm.valid) {
        this.SrvUsuarios.actualizarDatosUsuarios(
          this.usuariosForm.value
        ).subscribe(() => {
          alert("El usuario se ha ACTUALIZADO Exitosamente");
          this.usuariosForm.reset();
          this.router.navigate(["usuarios/busqueda-usuarios"]);
        });
      } else {
        this.usuariosForm.getError;
      }
    }
  }

  administrarPerfiles() {
    this.router.navigate([
      "panel/usuarios/administrar-perfiles/" +
        this.empleadosInter[0].empleados_id +
        "/" +
        this.usuariosForm.controls.id_usuario.value,
    ]);
  }
}

interface EmpleadosInterface {
  empleados_id: number;
  personas_id: number;
  apellido: string;
  nombre: string;
}
