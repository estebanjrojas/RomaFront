import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TabgralService } from "../../../../../../comunes/servicios/tabgral.service";
import { EmpleadosService } from "../../../../../../comunes/servicios/empleados.service";
import { DomiciliosService } from "../../../../../../comunes/servicios/domicilios.service";
//import { Ciudades } from "src/app/comunes/interfaces/Ciudades";
import { Component, OnInit } from "@angular/core";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { PersonasService } from "../../../../../../comunes/servicios/personas.service";
import { Empleados } from "src/app/comunes/interfaces/Empleados";
import { Provincias } from "src/app/comunes/interfaces/Provincias";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

export interface CiudadesInterface {
  id: number;
  descrip: string;
}

@Component({
  selector: "app-cargar-empleados",
  templateUrl: "./cargar-empleados.component.html",
  styleUrls: ["./cargar-empleados.component.scss"],
})
export class CargarEmpleadosComponent implements OnInit {
  miEmpleado: Empleados;
  provincias: Provincias[] = [];
  oficinas: any;
  empleadosForm: FormGroup;

  ciudades: CiudadesInterface[] = [];
  ///ciudadesClass: Ciudades = new Ciudades();

  ciudades_id: any = 0;

  filteredOptions: Observable<CiudadesInterface[]>;
  jsonFinal: { ciudad: string; formulario: any; empleado_id: any };

  constructor(
    private SrvTabgral: TabgralService,
    private SrvEmpleados: EmpleadosService,
    private SrvPersonas: PersonasService,
    private SrvDomicilios: DomiciliosService,
    private formBuilder: FormBuilder,
    private snackBar2: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empleadosForm = this.formBuilder.group({
      documento: [
        "",
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(8),
          Validators.pattern("[0-9]*"),
        ],
      ],
      apellido: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z ]*"),
        ]),
      ],
      nombre: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z ]*"),
        ]),
      ],
      fecha_nacimiento: ["", Validators.compose([Validators.required])],
      domicilios_id: [],
      calle: ["", Validators.compose([Validators.required])],
      numero: ["", Validators.compose([Validators.required])],
      piso: ["", Validators.compose([])],
      depto: ["", Validators.compose([])],
      manzana: ["", Validators.compose([])],
      provincia: ["", Validators.compose([Validators.required])],
      ciudades: ["", Validators.compose([Validators.required])],
      ciudades_id: ["", Validators.compose([])],
      legajo: ["", Validators.compose([Validators.required])],
      oficina: ["", Validators.compose([Validators.required])],
      fecha_ingreso: ["", Validators.compose([Validators.required])],
      descripcion: ["", Validators.compose([Validators.required])],
      nombre_usuario: ["", Validators.compose([])],
      tipo_doc: ["", Validators.compose([Validators.required])],
      sexo: ["", Validators.compose([Validators.required])],
      telefono: ["", [Validators.pattern("[0-9]*")]],
      celular: ["", [Validators.pattern("[0-9]*")]],
      email: ["", [Validators.email, Validators.required]],
      empleados_id: [],
      personas_id: [],
      empresas_id: ["1", Validators.compose([])],
    });
  }

  ngOnInit() {
    this.empleadosForm.controls.tipo_doc.setValue("3");

    this.route.params.subscribe((params) => {
      if (params.empleados_id != null) {
        this.empleadosForm.controls.empleados_id.setValue(params.empleados_id);
        this.SrvEmpleados.getDatosEmpleadoPorId(params.empleados_id).subscribe(
          (respuesta) => {
            console.log({ "SrvEmpleados.getDatosEmpleadoPorId": respuesta });
            let cast: any = respuesta;
            //Datos personales
            this.empleadosForm.controls.apellido.setValue(cast[0].apellido);
            this.empleadosForm.controls.nombre.setValue(cast[0].nombre);
            this.empleadosForm.controls.documento.setValue(cast[0].nro_doc);
            this.empleadosForm.controls.tipo_doc.setValue(
              cast[0].tipo_doc + ""
            );
            this.empleadosForm.controls.fecha_nacimiento.setValue(
              cast[0].fecha_nac
            );
            this.empleadosForm.controls.sexo.setValue(cast[0].sexo + "");
            this.empleadosForm.controls.telefono.setValue(cast[0].telefono);
            this.empleadosForm.controls.celular.setValue(cast[0].telefono_cel);
            this.empleadosForm.controls.email.setValue(cast[0].email);
            this.empleadosForm.controls.personas_id.setValue(
              cast[0].personas_id
            );
            //Relacion con la empresa
            this.empleadosForm.controls.legajo.setValue(cast[0].legajo);
            this.empleadosForm.controls.oficina.setValue(
              cast[0].oficinas_id + ""
            );
            this.empleadosForm.controls.fecha_ingreso.setValue(
              cast[0].fecha_ingreso
            );
            this.empleadosForm.controls.descripcion.setValue(
              cast[0].descripcion
            );
            this.empleadosForm.controls.empleados_id.setValue(
              params.empleados_id
            );

            //Domicilio
            this.empleadosForm.controls.domicilios_id.setValue(
              cast[0].domicilios_id
            );
            this.empleadosForm.controls.calle.setValue(cast[0].domicilio_calle);
            this.empleadosForm.controls.numero.setValue(
              cast[0].domicilio_numero
            );
            this.empleadosForm.controls.piso.setValue(cast[0].domicilio_piso);
            this.empleadosForm.controls.depto.setValue(cast[0].domicilio_depto);
            this.empleadosForm.controls.manzana.setValue(
              cast[0].domicilio_manzana
            );
            this.empleadosForm.controls.provincia.setValue(
              cast[0].domicilio_provincias_id
            );
            this.empleadosForm.controls.ciudades.setValue(
              cast[0].domicilio_ciudad
            );
          }
        );
      }
    });

    //Llenado de combo provincias
    this.SrvDomicilios.getProvinciasPorPais(1).subscribe((respuesta) => {
      console.log({ "SrvDomicilios.getProvinciasPorPais": respuesta });
      let cast: any = respuesta;
      for (let i = 0; i < cast.length; i++) {
        this.provincias.push({ id: cast[i].id, nombre: cast[i].nombre });
      }

      this.empleadosForm.controls.provincia.setValue(23);
      this.getCiudadesPorProvincia();
    });

    this.SrvEmpleados.getOficinas().subscribe((respuesta) => {
      this.oficinas = respuesta;
    });

    this.filteredOptions =
      this.empleadosForm.controls.ciudades.valueChanges.pipe(
        startWith<string | CiudadesInterface>(""),
        map((value) => (typeof value === "string" ? value : value.descrip)),
        map((descrip) =>
          descrip ? this._filter(descrip) : this.ciudades.slice()
        )
      );
  }

  getCiudadesPorProvincia() {
    let provincias_id = this.empleadosForm.controls.provincia.value;
    this.SrvDomicilios.getCiudadesPorProvincia(provincias_id).subscribe(
      (respuesta) => {
        let cast: any = respuesta;
        for (let i = 0; i < cast.length; i++) {
          this.ciudades.push({
            id: cast[i].id,
            descrip: cast[i].nombre.trim(),
          });
          //por alguna razon el nombre viene con espacios en blanco alrededor asi que se hace un trim por javascript
        }
      }
    );
  }

  buscarPorDocumento() {
    let tipo_documento = this.empleadosForm.get("tipo_doc").value;
    let documento = this.empleadosForm.get("documento").value;
    this.SrvPersonas.getPersonaPorNroDoc(tipo_documento, documento).subscribe(
      (respuesta) => {
        let cast: any = respuesta;
        this.empleadosForm.controls.apellido.setValue(cast[0].apellido);
        this.empleadosForm.controls.nombre.setValue(cast[0].nombre);
        this.empleadosForm.controls.fecha_nacimiento.setValue(
          cast[0].fecha_nac
        );
        this.empleadosForm.controls.telefono.setValue(cast[0].telefono);
        this.empleadosForm.controls.celular.setValue(cast[0].telefono_cel);
        this.empleadosForm.controls.email.setValue(cast[0].email);
        this.empleadosForm.controls.tipo_doc.setValue(cast[0].tipo_doc + "");
        this.empleadosForm.controls.sexo.setValue(cast[0].sexo + "");
        this.empleadosForm.controls.personas_id.setValue(cast[0].id + "");
      }
    );

    this.SrvEmpleados.getEmpleadoPorNroDoc(tipo_documento, documento).subscribe(
      (respuesta) => {
        let cast: any = respuesta;

        this.empleadosForm.controls.legajo.setValue(cast[0].legajo);
        this.empleadosForm.controls.fecha_ingreso.setValue(
          cast[0].fecha_ingreso
        );
        this.empleadosForm.controls.descripcion.setValue(cast[0].descripcion);
        this.empleadosForm.controls.oficina.setValue(cast[0].oficinas_id);
        this.empleadosForm.controls.empleados_id.setValue(cast[0].empleados_id);
      }
    );

    this.SrvDomicilios.getDomicilioByNroDoc(documento).subscribe(
      (respuesta) => {
        let cast: any = respuesta[0];
        if (cast) {
          this.empleadosForm.controls.calle.setValue(cast.calle);
          this.empleadosForm.controls.numero.setValue(cast.numero);
          this.empleadosForm.controls.piso.setValue(cast.piso);
          this.empleadosForm.controls.depto.setValue(cast.depto);
          this.empleadosForm.controls.manzana.setValue(cast.manzana);
          this.empleadosForm.controls.provincia.setValue(cast.provincias_id);
          this.empleadosForm.controls.domicilios_id.setValue(
            cast.domicilios_id
          );

          this.getCiudadesPorProvincia();
        }
      }
    );
  }

  //Agregada validación entre objeto y String. REPETIR en Proyecto.
  displayFn(user?: CiudadesInterface): string | undefined {
    return typeof user !== "string" ? user.descrip : user;
    //return user ? user.descrip : undefined;
  }

  private _filter(descrip: string): CiudadesInterface[] {
    const filterValue = descrip.toLowerCase();

    return this.ciudades.filter(
      (option) => option.descrip.toLowerCase().indexOf(filterValue) === 0
    );
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 == c2 : false;
  }

  guardarEmpleadoV2() {
    let id_empleado = this.empleadosForm.controls.empleados_id.value;
    let ciudad_nombre = (<HTMLInputElement>document.getElementById("ciudades"))
      .value;

    this.jsonFinal = {
      ciudad: ciudad_nombre,
      formulario: this.empleadosForm.getRawValue(),
      empleado_id: id_empleado,
    };
    if (this.empleadosForm.valid) {
      if (id_empleado != null || id_empleado != undefined) {
        this.SrvEmpleados.insertEmpleado(this.jsonFinal).subscribe(
          (resp) => {
            console.log({ "SrvEmpleados.insertEmpleado": resp });
            alert("El Empleado se ha ACTUALIZADO Exitosamente");
          },
          (err) => {
            this.mostrarMensajeError(
              "Ocurrió un error al intentar insertar los datos del empleado... "
            );
          },
          () => {
            this.mostrarMensajeInformativo(
              "El empleado fue dado de alta exitosamente. "
            );
          }
        );
      } else {
        this.SrvEmpleados.insertEmpleado(this.jsonFinal).subscribe(
          (resp) => {
            console.log({ "SrvEmpleados.updateEmpleado": resp });
            alert("El Empleado se ha CARGADO Exitosamente");
          },
          (err) => {
            this.mostrarMensajeError(
              "Ocurrió un error al intentar insertar los datos del empleado... "
            );
          },
          () => {
            this.mostrarMensajeInformativo(
              "El empleado fue dado de alta exitosamente. "
            );
          }
        );
      }
    } else {
      this.mostrarMensajeError(
        "Existen campos obligatorios sin completar. Por favor verifique. "
      );
    }
  }

  guardarEmpleado() {
    let id_empleado = this.empleadosForm.controls.empleados_id.value;
    if (this.empleadosForm.valid) {
      let ciudad_nombre = (<HTMLInputElement>(
        document.getElementById("ciudades")
      )).value;
      let ciudades_id = 0;

      this.SrvDomicilios.getCiudadesIdPorNombre(ciudad_nombre).subscribe(
        (respuesta) => {
          let cast: any = respuesta;
          this.ciudades_id = cast.id;
          this.empleadosForm.controls.ciudades_id.setValue(cast.id);
        },
        (err) => {
          console.error(err);
        },
        () => {
          if (id_empleado != null || id_empleado != undefined) {
            this.SrvEmpleados.guardarEmpleadoPersonaDomicilio(
              this.empleadosForm.getRawValue()
            ).subscribe(() => {
              alert("El Empleado se ha ACTUALIZADO Exitosamente");
            });
          } else {
            this.SrvEmpleados.guardarEmpleadoPersonaDomicilio(
              this.empleadosForm.getRawValue()
            ).subscribe(() => {
              alert("El Empleado se ha CARGADO Exitosamente");
            });
          }
        }
      );
    } else {
      console.error({
        "Formulario Invalido. Revise los controles":
          this.empleadosForm.controls,
      });
      this.empleadosForm.getError;
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
