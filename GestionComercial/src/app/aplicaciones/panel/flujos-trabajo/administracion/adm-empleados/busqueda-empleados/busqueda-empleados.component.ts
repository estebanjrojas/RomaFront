import { Component, OnInit, Output } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EmpleadosService } from "../../../../../../comunes/servicios/empleados.service";
import { BotonDinamico } from "src/app/core/ui/comunes/interfaces/BotonDinamico";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: "app-busqueda-empleados",
  templateUrl: "./busqueda-empleados.component.html",
  styleUrls: ["./busqueda-empleados.component.scss"],
})
export class BusquedaEmpleadosComponent implements OnInit {
  //Variables
  nomb_usr: string;
  formBusquedaEmpleados: FormGroup;
  cast: any;
  buscar: string = "";
  cantidad_paginas: number = 0;
  pagina_actual: number = 1;
  valor_boton_1: number = 1;
  valor_boton_2: number = 2;
  valor_boton_3: number = 3;

  botonPrincipal: BotonDinamico = {
    mostrar: true,
    accion: this.irNuevoEmpleado.bind(this),
    texto: "Nuevo Empleado",
  };

  constructor(
    private SrvEmpleados: EmpleadosService,
    private router: Router,
    private snackBar2: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.formBusquedaEmpleados = this.formBuilder.group({
      filtroBusqueda: [1],
      buscar_nombre: [true],
      buscar_documento: [true],
      buscar_fechanac: [true],
      buscar_oficina: [true],
      txtBuscar: [""],
      cantidad_borrar: [],
    });
  }

  irNuevoEmpleado() {
    this.router.navigate(["panel", "empleados", "cargar-empleados"]);
  }

  ngOnInit() {
    this.nomb_usr = localStorage.getItem("roma_usuario");
    this.buscarEmpleados();
  }

  buscarEmpleados() {
    let txtBuscar = this.formBusquedaEmpleados.get("txtBuscar").value;
    let nombre = this.formBusquedaEmpleados.get("buscar_nombre").value;
    let documento = this.formBusquedaEmpleados.get("buscar_documento").value;
    let fecha_nac = this.formBusquedaEmpleados.get("buscar_fechanac").value;
    let oficina = this.formBusquedaEmpleados.get("buscar_oficina").value;
    let buscar_por_nombre = 1;
    let buscar_por_documento = 1;
    let buscar_por_fechanac = 1;
    let buscar_por_oficina = 1;
    if (nombre == true) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (documento == true) {
      buscar_por_documento = 1;
    } else {
      buscar_por_documento = 0;
    }
    if (fecha_nac == true) {
      buscar_por_fechanac = 1;
    } else {
      buscar_por_fechanac = 0;
    }
    if (oficina == true) {
      buscar_por_oficina = 1;
    } else {
      buscar_por_oficina = 0;
    }
    this.SrvEmpleados.getCantidadPaginasEmpleados(
      buscar_por_nombre,
      buscar_por_documento,
      buscar_por_fechanac,
      buscar_por_oficina,
      txtBuscar
    ).subscribe(
      (respuesta) => {
        let cast: any = respuesta.regCantidadPaginas.cantidad_paginas;
        this.cantidad_paginas = cast;
        this.pagina_actual = 1;
        this.setCantidadPaginas();
      },
      (error) => {
        console.error("ERROR: " + JSON.stringify(error));
      }
    );
  }

  /** trae el detalle en base a la posicion y busqueda */
  getItems() {
    let txtBuscar = this.formBusquedaEmpleados.get("txtBuscar").value;
    let nombre = this.formBusquedaEmpleados.get("buscar_nombre").value;
    let documento = this.formBusquedaEmpleados.get("buscar_documento").value;
    let fecha_nac = this.formBusquedaEmpleados.get("buscar_fechanac").value;
    let oficina = this.formBusquedaEmpleados.get("buscar_oficina").value;
    let buscar_por_nombre = 1;
    let buscar_por_documento = 1;
    let buscar_por_fechanac = 1;
    let buscar_por_oficina = 1;
    if (nombre == true) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (documento == true) {
      buscar_por_documento = 1;
    } else {
      buscar_por_documento = 0;
    }
    if (fecha_nac == true) {
      buscar_por_fechanac = 1;
    } else {
      buscar_por_fechanac = 0;
    }
    if (oficina == true) {
      buscar_por_oficina = 1;
    } else {
      buscar_por_oficina = 0;
    }
    this.SrvEmpleados.getEmpleados(
      this.pagina_actual,
      this.cantidad_paginas,
      buscar_por_nombre,
      buscar_por_documento,
      buscar_por_fechanac,
      buscar_por_oficina,
      txtBuscar
    ).subscribe(
      (respuesta) => {
        this.cast = respuesta;
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }
  /** posiciona el indice en el boton seleccionado */
  setPaginaByComponenteId(valor) {
    this.pagina_actual = valor;
    this.setCantidadPaginas();
  }
  /** habilita la cantidad de botones indices en base a la cant de paginas */
  setCantidadPaginas() {
    if (this.pagina_actual <= 0) {
      this.pagina_actual = 1;
    }
    if (this.pagina_actual >= this.cantidad_paginas) {
      this.pagina_actual = this.cantidad_paginas;
    }
    this.paginarEn(this.pagina_actual);
    this.getItems();
  }
  /** enumera los botones en base a la pagina actual */
  paginarEn(paginarEnNumero) {
    if (paginarEnNumero <= 2) {
      paginarEnNumero = 2;
    } else {
      if (paginarEnNumero == this.cantidad_paginas) {
        paginarEnNumero = this.cantidad_paginas - 1;
      }
    }
    this.valor_boton_1 = paginarEnNumero - 1;
    this.valor_boton_2 = paginarEnNumero;
    this.valor_boton_3 = paginarEnNumero + 1;
  }

  actualizarEmpleado(empleados_id) {}

  eliminarEmpleado(empleados_id) {
    let opcion = confirm(
      "Esta acción procederá a dar de baja el empleado, desea continuar?"
    );
    if (opcion) {
      this.deleteEmpleado(empleados_id);
      //this.verificarProductoPoseeCaracteristicas(productos_id);
    }
  }

  deleteEmpleado(empleados_id: any) {
    this.SrvEmpleados.deleteEmpleado(empleados_id).subscribe(
      (respuesta) => {
        console.log({ "SrvEmpleados.deleteEmpleado": respuesta });
      },
      (err) => {
        console.log({ err: err });
        this.mostrarMensajeError(
          "Ha ocurrido un error al intentar eliminar el empleado. " + err
        );
      },
      () => {
        this.mostrarMensajeInformativo(
          "El empleado se ha eliminado correctamente... "
        );
        this.buscarEmpleados();
      }
    );
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
