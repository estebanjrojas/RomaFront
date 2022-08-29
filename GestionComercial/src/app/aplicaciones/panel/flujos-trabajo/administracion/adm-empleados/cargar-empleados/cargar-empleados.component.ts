import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TabgralService } from "../../../../../../comunes/servicios/tabgral.service";
import { EmpleadosService } from "../../../../../../comunes/servicios/empleados.service";
import { DomiciliosService } from "../../../../../../comunes/servicios/domicilios.service";
import { Ciudades } from "src/app/comunes/interfaces/Ciudades";
import { Component, OnInit } from "@angular/core";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { PersonasService } from "../../../../../../comunes/servicios/personas.service";
import { Empleados } from "src/app/comunes/interfaces/Empleados";
import { Provincias } from "src/app/comunes/interfaces/Provincias";
import { ActivatedRoute, Router } from "@angular/router";

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
  ciudadesClass: Ciudades = new Ciudades();

  ciudades_id: any = 0;

  filteredOptions: Observable<CiudadesInterface[]>;

  constructor(
    private SrvTabgral: TabgralService,
    private SrvEmpleados: EmpleadosService,
    private SrvPersonas: PersonasService,
    private SrvDomicilios: DomiciliosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empleadosForm = this.formBuilder.group({
      documento: [
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]*")]),
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
      telefono: ["", Validators.compose([])],
      celular: ["", Validators.compose([])],
      email: ["", Validators.compose([])],
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
            /* this.SrvDomicilios.getDomicilioByNroDoc(cast[0].nro_doc).subscribe(respuesta2 => {
             console.log({'SrvDomicilios.getDomicilioByNroDoc' : respuesta2});
             let cast2 : any = respuesta[0];
             if(cast2) {
               this.empleadosForm.controls.calle.setValue(cast2.calle);
               this.empleadosForm.controls.numero.setValue(cast2.numero);
               this.empleadosForm.controls.piso.setValue(cast2.piso);
               this.empleadosForm.controls.depto.setValue(cast2.depto);
               this.empleadosForm.controls.manzana.setValue(cast2.manzana);
               this.empleadosForm.controls.provincia.setValue(cast2.provincias_id+"");
               this.empleadosForm.controls.ciudades.setValue(cast2.ciudad_nombre);
             }
       
       
           });*/
          }
        );
      }
      console.log(params);
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

    this.SrvTabgral.selectByNroTab(3).subscribe((respuesta) => {
      console.log({ "SrvTabgral.selectByNroTab": respuesta });
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
        console.log({ "SrvDomicilios.getCiudadesPorProvincia": cast });
        for (let i = 0; i < cast.length; i++) {
          this.ciudades.push({
            id: cast[i].id,
            descrip: cast[i].nombre.trim(),
          });
          //por alguna razon el nombre viene con espacios en blanco alrededor asi que se hace un trim por javascript
        }
        console.log(this.ciudades);
      }
    );
  }

  buscarPorDocumento() {
    let tipo_documento = this.empleadosForm.get("tipo_doc").value;
    let documento = this.empleadosForm.get("documento").value;
    this.SrvPersonas.getPersonaPorNroDoc(tipo_documento, documento).subscribe(
      (respuesta) => {
        console.log({ "SrvPersonas.getPersonaPorNroDoc": respuesta });

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
        console.log({ "SrvEmpleados.getEmpleadoPorNroDoc": respuesta });
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
        console.log({ "SrvDomicilios.getDomicilioByNroDoc": respuesta });
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
    console.log("Display Object is ---> " + user);
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

  guardarEmpleado() {
    let id_empleado = this.empleadosForm.controls.empleados_id.value;
    if (this.empleadosForm.valid) {
      console.log(JSON.stringify(this.empleadosForm.getRawValue()));
      let ciudad_nombre = (<HTMLInputElement>(
        document.getElementById("ciudades")
      )).value;
      let ciudades_id = 0;

      this.SrvDomicilios.getCiudadesIdPorNombre(ciudad_nombre).subscribe(
        (respuesta) => {
          console.log({ "SrvDomicilios.getCiudadesIdPorNombre": respuesta });
          let cast: any = respuesta;
          this.ciudades_id = cast.id;
          this.empleadosForm.controls.ciudades_id.setValue(cast.id);
          console.log(JSON.stringify(this.empleadosForm.getRawValue()));
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log({ Ciudad_nombre: ciudad_nombre });
          if (id_empleado != null || id_empleado != undefined) {
            console.log("Modificar...");
            console.log(JSON.stringify(this.empleadosForm.getRawValue()));
            this.SrvEmpleados.guardarEmpleadoPersonaDomicilio(
              this.empleadosForm.getRawValue()
            ).subscribe((respuesta) => {
              console.log({
                "SrvEmpleados.guardarEmpleadoPersonaDomicilio": respuesta,
              });
              alert("El Empleado se ha ACTUALIZADO Exitosamente");
              //this.empleadosForm.reset();
              //this.router.navigate(['cementerios/busqueda-cementerios']);
            });
          } else {
            console.log("Insertar...");
            console.log(JSON.stringify(this.empleadosForm.getRawValue()));

            this.SrvEmpleados.guardarEmpleadoPersonaDomicilio(
              this.empleadosForm.getRawValue()
            ).subscribe((respuesta) => {
              console.log({
                "SrvEmpleados.guardarEmpleadoPersonaDomicilio": respuesta,
              });
              alert("El Empleado se ha CARGADO Exitosamente");
              //this.empleadosForm.reset();
              //this.router.navigate(['cementerios/busqueda-cementerios']);
            });
          }
        }
      );
    } else {
      console.error({
        "Formulario Invalido. Revise los controles":
          this.empleadosForm.controls,
      });
      console.log(this.empleadosForm);
      this.empleadosForm.getError;
    }
  }
}

//Armado de JSON para enviar.
/* 
          let campos_domicilio = {
            "ciudades_id": ciudades_id,
            "calle": ((this.empleadosForm.get('calle') != undefined) ? this.empleadosForm.get('calle').value : ""),
            "numero": ((this.empleadosForm.get('numero') != undefined) ? this.empleadosForm.get('numero').value : ""),
            "piso": ((this.empleadosForm.get('piso') != undefined) ? this.empleadosForm.get('piso').value : ""),
            "depto": ((this.empleadosForm.get('depto') != undefined) ? this.empleadosForm.get('depto').value : ""),
            "manzana": ((this.empleadosForm.get('manzana') != undefined) ? this.empleadosForm.get('manzana').value : ""),
            "lote": ((this.empleadosForm.get('lote') != undefined) ? this.empleadosForm.get('lote').value : ""),
            "block": ((this.empleadosForm.get('block') != undefined) ? this.empleadosForm.get('block').value : ""),
            "barrio": ((this.empleadosForm.get('barrio') != undefined) ? this.empleadosForm.get('barrio').value : "")
          };

          let insert_completo = {
            domicilio: campos_domicilio,
            //Persona
            "tipo_doc": this.empleadosForm.get('tipo_doc').value,
            "nro_doc": this.empleadosForm.get('documento').value,
            "apellido": this.empleadosForm.get('apellido').value,
            "nombre": this.empleadosForm.get('nombre').value,
            "telefono": this.empleadosForm.get('telefono').value,
            "celular": this.empleadosForm.get('celular').value,
            "email": this.empleadosForm.get('email').value,
            "fecha_nac": this.empleadosForm.get('fecha_nacimiento').value,
            "sexo": this.empleadosForm.get('sexo').value,
            "personas_id": this.empleadosForm.get('personas_id').value,
            "domicilios_id": this.empleadosForm.get('domicilios_id').value,
            //Empleado
            "legajo": this.empleadosForm.get('legajo').value,
            "fecha_ingreso": this.empleadosForm.get('fecha_ingreso').value,
            "empresas_id": "1",
            "descripcion": this.empleadosForm.get('descripcion').value,
            "oficina": this.empleadosForm.get('oficina').value,
            "empleados_id": this.empleadosForm.get('empleados_id').value
          }
          console.log(JSON.stringify(this.empleadosForm.getRawValue()));
          console.log({ "Insertar": insert_completo });
          this.SrvEmpleados.guardarEmpleadoPersonaDomicilio(insert_completo).subscribe(resp => {

            this.empleadosForm.reset;
          });

*/
