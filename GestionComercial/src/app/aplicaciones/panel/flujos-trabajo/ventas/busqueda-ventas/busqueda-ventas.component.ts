import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { VentasService } from "../../../../../comunes/servicios/ventas.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-busqueda-ventas",
  templateUrl: "./busqueda-ventas.component.html",
  styleUrls: ["./busqueda-ventas.component.scss"],
})
export class BusquedaVentasComponent implements OnInit {
  //Variables
  nomb_usr: string;
  formBusquedaVentas: FormGroup;
  cast: any;
  buscar: string = "";
  cantidad_paginas: number = 0;
  pagina_actual: number = 1;
  valor_boton_1: number = 1;
  valor_boton_2: number = 2;
  valor_boton_3: number = 3;

  constructor(
    private SrvVentas: VentasService,
    private formBuilder: FormBuilder
  ) {
    this.formBusquedaVentas = this.formBuilder.group({
      filtroBusqueda: [1],
      buscar_fecha: [true],
      buscar_nombre: [true],
      buscar_vendedor: [true],
      buscar_monto: [true],
      txtBuscar: [""],
      cantidad_borrar: [],
    });
  }

  ngOnInit() {
    this.nomb_usr = localStorage.getItem("roma_usuario");
    this.buscarVentas();
  }

  buscarVentas() {
    let txtBuscar = this.formBusquedaVentas.get("txtBuscar").value;
    let fecha = this.formBusquedaVentas.get("buscar_fecha").value;
    let nombre = this.formBusquedaVentas.get("buscar_nombre").value;
    let vendedor = this.formBusquedaVentas.get("buscar_vendedor").value;
    let monto = this.formBusquedaVentas.get("buscar_monto").value;
    let buscar_por_fecha = 1;
    let buscar_por_nombre = 1;
    let buscar_por_vendedor = 1;
    let buscar_por_monto = 1;
    if (fecha == true) {
      buscar_por_fecha = 1;
    } else {
      buscar_por_fecha = 0;
    }
    if (nombre == true) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (vendedor == true) {
      buscar_por_vendedor = 1;
    } else {
      buscar_por_vendedor = 0;
    }
    if (monto == true) {
      buscar_por_monto = 1;
    } else {
      buscar_por_monto = 0;
    }
    this.SrvVentas.getCantidadPaginasVentas(
      buscar_por_fecha,
      buscar_por_nombre,
      buscar_por_vendedor,
      buscar_por_monto,
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
    let txtBuscar = this.formBusquedaVentas.get("txtBuscar").value;
    let fecha = this.formBusquedaVentas.get("buscar_fecha").value;
    let nombre = this.formBusquedaVentas.get("buscar_nombre").value;
    let vendedor = this.formBusquedaVentas.get("buscar_vendedor").value;
    let monto = this.formBusquedaVentas.get("buscar_monto").value;
    let buscar_por_fecha = 1;
    let buscar_por_nombre = 1;
    let buscar_por_vendedor = 1;
    let buscar_por_monto = 1;
    if (fecha == true) {
      buscar_por_fecha = 1;
    } else {
      buscar_por_fecha = 0;
    }
    if (nombre == true) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (vendedor == true) {
      buscar_por_vendedor = 1;
    } else {
      buscar_por_vendedor = 0;
    }
    if (monto == true) {
      buscar_por_monto = 1;
    } else {
      buscar_por_monto = 0;
    }
    this.SrvVentas.getVentas(
      this.pagina_actual,
      this.cantidad_paginas,
      buscar_por_fecha,
      buscar_por_nombre,
      buscar_por_vendedor,
      buscar_por_monto,
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

  anularVenta(ventas_id) {
    const usuario_anula = localStorage.getItem("roma_usuario");
    let autoriza = confirm("Está seguro que desea anular la venta?");
    if (autoriza) {
      const data = { ventas_id: ventas_id, usuario: usuario_anula };
      this.SrvVentas.anularVenta(data).subscribe(() => {
        this.buscarVentas();
      });
    }
  }
}
