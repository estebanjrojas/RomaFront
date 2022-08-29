import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UsuariosService } from "src/app/comunes/servicios/usuarios.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buscar-usuarios",
  templateUrl: "./buscar-usuarios.component.html",
  styleUrls: ["./buscar-usuarios.component.scss"],
})
export class BuscarUsuariosComponent implements OnInit {
  //Variables
  nomb_usr: string;
  formBusquedaUsuarios: FormGroup;
  cast: any;
  buscar: string = "";
  cantidad_paginas: number = 0;
  pagina_actual: number = 1;
  valor_boton_1: number = 1;
  valor_boton_2: number = 2;
  valor_boton_3: number = 3;

  constructor(
    private SrvUsuarios: UsuariosService,
    private formBuilder: FormBuilder
  ) {
    this.formBusquedaUsuarios = this.formBuilder.group({
      filtroBusqueda: [1],
      buscar_nombre: [true],
      buscar_usuario: [true],
      buscar_descripcion: [true],
      txtBuscar: [""],
      cantidad_borrar: [],
    });
  }

  ngOnInit() {
    this.nomb_usr = localStorage.getItem("roma_usuario");
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    let txtBuscar = this.formBusquedaUsuarios.get("txtBuscar").value;
    let nombre = this.formBusquedaUsuarios.get("buscar_nombre").value;
    let usuario = this.formBusquedaUsuarios.get("buscar_usuario").value;
    let descripcion = this.formBusquedaUsuarios.get("buscar_descripcion").value;
    let buscar_por_nombre = 1;
    let buscar_por_usuario = 1;
    let buscar_por_descripcion = 1;
    if (nombre == true) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (usuario == true) {
      buscar_por_usuario = 1;
    } else {
      buscar_por_usuario = 0;
    }
    if (descripcion == true) {
      buscar_por_descripcion = 1;
    } else {
      buscar_por_descripcion = 0;
    }
    this.SrvUsuarios.getCantidadPaginasUsuarios(
      buscar_por_nombre,
      buscar_por_usuario,
      buscar_por_descripcion,
      txtBuscar
    ).subscribe(
      (respuesta) => {
        console.log({ "SrvUsuarios.getCantidadPaginasUsuarios": respuesta });
        let cast: any = respuesta.regCantidadPaginas.cantidad_paginas;
        this.cantidad_paginas = cast;
        this.pagina_actual = 1;
        this.setCantidadPaginas();
      },
      (error) => {
        console.log("ERROR: " + JSON.stringify(error));
      }
    );
  }

  /** trae el detalle en base a la posicion y busqueda */
  getItems() {
    let txtBuscar = this.formBusquedaUsuarios.get("txtBuscar").value;
    let nombre = this.formBusquedaUsuarios.get("buscar_nombre").value;
    let usuario = this.formBusquedaUsuarios.get("buscar_usuario").value;
    let descripcion = this.formBusquedaUsuarios.get("buscar_descripcion").value;
    let buscar_por_nombre = 1;
    let buscar_por_usuario = 1;
    let buscar_por_descripcion = 1;
    if (nombre == true) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (usuario == true) {
      buscar_por_usuario = 1;
    } else {
      buscar_por_usuario = 0;
    }
    if (descripcion == true) {
      buscar_por_descripcion = 1;
    } else {
      buscar_por_descripcion = 0;
    }
    this.SrvUsuarios.getUsuarios(
      this.pagina_actual,
      this.cantidad_paginas,
      buscar_por_nombre,
      buscar_por_usuario,
      buscar_por_descripcion,
      txtBuscar
    ).subscribe(
      (respuesta) => {
        console.log({ "SrvUsuarios.getUsuarios": respuesta });
        this.cast = respuesta;
      },
      (error) => {
        console.log(JSON.stringify(error));
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
}
