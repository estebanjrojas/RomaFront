import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CategoriasService } from "../../../../../../comunes/servicios/categorias.service";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: "app-buscar-categoria",
  templateUrl: "./buscar-categoria.component.html",
  styleUrls: ["./buscar-categoria.component.scss"],
})
export class BuscarCategoriaComponent implements OnInit {
  //Variables
  formBusquedaCategorias: FormGroup;
  cast: any;
  buscar: string = "";
  cantidad_paginas: number = 0;
  pagina_actual: number = 1;
  valor_boton_1: number = 1;
  valor_boton_2: number = 2;
  valor_boton_3: number = 3;

  constructor(
    private SrvCategorias: CategoriasService,
    private snackBar2: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.formBusquedaCategorias = this.formBuilder.group({
      filtroBusqueda: [1],
      buscar_nombre: [true],
      buscar_descripcion: [true],
      buscar_catpadre: [true],
      txtBuscar: [""],
      cantidad_borrar: [],
    });
  }

  ngOnInit() {
    this.buscarCategorias();
  }

  buscarCategorias() {
    let txtBuscar = this.formBusquedaCategorias.get("txtBuscar").value;
    let nombre = this.formBusquedaCategorias.get("buscar_nombre").value;
    let descripcion =
      this.formBusquedaCategorias.get("buscar_descripcion").value;
    let catpadre = this.formBusquedaCategorias.get("buscar_catpadre").value;
    let buscar_por_nombre = 1;
    let buscar_por_descripcion = 1;
    let buscar_por_catpadre = 1;
    if (nombre == true) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (descripcion == true) {
      buscar_por_descripcion = 1;
    } else {
      buscar_por_descripcion = 0;
    }
    if (catpadre == true) {
      buscar_por_catpadre = 1;
    } else {
      buscar_por_catpadre = 0;
    }
    this.SrvCategorias.getCantidadPaginasCategorias(
      buscar_por_nombre,
      buscar_por_descripcion,
      buscar_por_catpadre,
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
    let txtBuscar = this.formBusquedaCategorias.get("txtBuscar").value;
    let nombre = this.formBusquedaCategorias.get("buscar_nombre").value;
    let descripcion =
      this.formBusquedaCategorias.get("buscar_descripcion").value;
    let catpadre = this.formBusquedaCategorias.get("buscar_catpadre").value;
    let buscar_por_nombre = 1;
    let buscar_por_descripcion = 1;
    let buscar_por_catpadre = 1;
    if (nombre == true) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (descripcion == true) {
      buscar_por_descripcion = 1;
    } else {
      buscar_por_descripcion = 0;
    }
    if (catpadre == true) {
      buscar_por_catpadre = 1;
    } else {
      buscar_por_catpadre = 0;
    }
    this.SrvCategorias.getCategoria(
      this.pagina_actual,
      this.cantidad_paginas,
      buscar_por_nombre,
      buscar_por_descripcion,
      buscar_por_catpadre,
      txtBuscar
    ).subscribe(
      (respuesta) => {
        console.log({ respuesta: respuesta });
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

  deleteCategoria(id: any) {
    let opcion = confirm(
      "Esta acción procederá a eliminar la categoria, desea continuar?"
    );
    if (opcion) {
      this.SrvCategorias.deleteCategoria(id).subscribe(
        (respuesta) => {
          console.log({ "SrvCategorias.deleteCategoria": respuesta });
        },
        (err) => {
          console.log({ err: err });
          this.mostrarMensajeError(
            "Ha ocurrido un error al intentar eliminar la categoria. " + err
          );
        },
        () => {
          this.mostrarMensajeInformativo(
            "La categoria se ha eliminado correctamente... "
          );
          this.buscarCategorias();
        }
      );
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
