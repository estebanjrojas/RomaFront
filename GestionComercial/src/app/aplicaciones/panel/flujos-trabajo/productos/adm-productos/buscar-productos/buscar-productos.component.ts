import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProductosService } from "../../../../../../comunes/servicios/productos.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buscar-productos",
  templateUrl: "./buscar-productos.component.html",
  styleUrls: ["./buscar-productos.component.scss"],
})
export class BuscarProductosComponent implements OnInit {
  cast: any;
  buscar: string = "";
  cantidad_paginas: number = 0;
  pagina_actual: number = 1;
  buscar_codigo: boolean = true;
  buscar_nombre: boolean = true;
  buscar_descripcion: boolean = true;
  buscar_categoria: boolean = true;
  valor_boton_1: number = 1;
  valor_boton_2: number = 2;
  valor_boton_3: number = 3;
  htmlAdicionado: any = "";

  caracteristicas: ProductosCaracteristicas[];
  categorias: Categorias[];
  imagenes: Imagenes[];
  cantidad_imagenes: number = 0;
  tiene_caracteristicas: any;

  constructor(
    private SrvProductos: ProductosService,

    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.buscarProductos();
  }

  buscarProductos() {
    let buscar_por_codigo = 1;
    let buscar_por_nombre = 1;
    let buscar_por_descripcion = 1;
    let buscar_por_categoria = 1;
    if (this.buscar_codigo) {
      buscar_por_codigo = 1;
    } else {
      buscar_por_codigo = 0;
    }
    if (this.buscar_nombre) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (this.buscar_descripcion) {
      buscar_por_descripcion = 1;
    } else {
      buscar_por_descripcion = 0;
    }
    if (this.buscar_categoria) {
      buscar_por_categoria = 1;
    } else {
      buscar_por_categoria = 0;
    }
    this.SrvProductos.getCantidadPaginasProductos(
      buscar_por_codigo,
      buscar_por_nombre,
      buscar_por_descripcion,
      buscar_por_categoria,
      this.buscar
    ).subscribe(
      (respuesta) => {
        console.log({ "SrvProductos.getCantidadPaginasProductos": respuesta });
        let cast: any = respuesta.regCantidadPaginas.cantidad_paginas;
        this.cantidad_paginas = cast;
        this.pagina_actual = 1;
        this.setCantidadPaginas();
      },
      (error) => {
        console.error(JSON.stringify(error));
      }
    );
  }

  /** trae el detalle en base a la posicion y busqueda */
  getItems() {
    let buscar_por_codigo = 1;
    let buscar_por_nombre = 1;
    let buscar_por_descripcion = 1;
    let buscar_por_categoria = 1;
    if (this.buscar_codigo) {
      buscar_por_codigo = 1;
    } else {
      buscar_por_codigo = 0;
    }
    if (this.buscar_nombre) {
      buscar_por_nombre = 1;
    } else {
      buscar_por_nombre = 0;
    }
    if (this.buscar_descripcion) {
      buscar_por_descripcion = 1;
    } else {
      buscar_por_descripcion = 0;
    }
    if (this.buscar_categoria) {
      buscar_por_categoria = 1;
    } else {
      buscar_por_categoria = 0;
    }
    this.SrvProductos.getProductos(
      this.pagina_actual,
      this.cantidad_paginas,
      buscar_por_codigo,
      buscar_por_nombre,
      buscar_por_descripcion,
      buscar_por_categoria,
      this.buscar
    ).subscribe(
      (respuesta) => {
        console.log({ "SrvProductos.getProductos": respuesta });
        this.cast = respuesta;
      },
      (error) => {
        console.error(JSON.stringify(error));
      },
      () => { }
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

  eliminarProducto(productos_id) {
    let opcion = confirm("Esta acción procederá a eliminar el producto, desea continuar?");
    if (opcion) {
      this.verificarProductoPoseeCaracteristicas(productos_id);
    }
  }

  verificarProductoPoseeCaracteristicas(productos_id: any): any {
    this.SrvProductos.verificarProductoPoseeCaracteristicas(productos_id).subscribe(respuesta => {
      console.log({ 'SrvProductos.verificarProductoPoseeCaracteristicas': respuesta });
      let cast: any = respuesta;
      this.tiene_caracteristicas = cast[0].respuesta;
    }, err => {
      console.log({ 'ERROR': err });
    }, () => {
      this.eliminarCaracteristicasProductos(productos_id);
    });
  }

  eliminarCaracteristicasProductos(productos_id: any) {
    if (this.tiene_caracteristicas) {
      this.SrvProductos.eliminarCaracteristicasProductos(productos_id).subscribe(respuesta => {
        console.log({ 'SrvProductos.eliminarCaracteristicasProductos': respuesta });
  
      }, err => {
        console.log({ 'ERROR': err });
      }, () => {
        this.verificarProductoPoseeImagenes(productos_id);
      });
    } else {
      this.verificarProductoPoseeImagenes(productos_id);
    }
  }

  verificarProductoPoseeImagenes(productos_id: any): any {
    this.SrvProductos.verificarProductoPoseeImagenes(productos_id).subscribe(respuesta => {
      console.log({ 'SrvProductos.verificarProductoPoseeImagenes': respuesta });
      let cast: any = respuesta;
      this.tiene_caracteristicas = cast[0].respuesta;
    }, err => {
      console.log({ 'ERROR': err });
    }, () => {
      this.eliminarImagenesProductos(productos_id);
    });
  }

  eliminarImagenesProductos(productos_id: any) {
    if (this.tiene_caracteristicas) {
      this.SrvProductos.eliminarImagenesProductos(productos_id).subscribe(respuesta => {
        console.log({ 'SrvProductos.eliminarImagenesProductos': respuesta });

      }, err => {
        console.log({ 'ERROR': err });
      }, () => {
        this.eliminarProductoById(productos_id);
      });
    } else {
      this.eliminarProductoById(productos_id);
    }
  }

  eliminarProductoById(productos_id: any) {
    this.SrvProductos.eliminarProductoById(productos_id).subscribe(respuesta => {
      console.log({ 'SrvProductos.eliminarProductoById': respuesta });

    }, err => {
      console.log({ 'ERROR': err });
    }, () => {
      this.buscarProductos();
    });
  }

  mostrarDetallesProductos(productos) {
    //this.htmlAdicionado = '<app-detalle-producto [producto]="'+productos+'"></app-detalle-producto>'
    this.htmlAdicionado = "ASDSD";
  }

  getCaracteristicasProductos(producto_id) {
    this.SrvProductos.getCaracteristicasProductos(producto_id).subscribe(
      (resp) => {
        console.log({ "SrvProductos.getCaracteristicasProductos ": resp });
        let cast: any = resp;
        this.caracteristicas = cast;
      },
      (err) => {
        console.log({ ERROR: err });
      },
      () => {
        this.getCategoriasProductos(producto_id);
      }
    );
  }

  getCategoriasProductos(producto_id) {
    this.SrvProductos.getCategoriasProductos(producto_id).subscribe(
      (resp) => {
        console.log({ "SrvProductos.getCategoriasProductos": resp });
        let cast: any = resp;
        this.categorias = cast;
      },
      (err) => {
        console.log({ ERROR: err });
      },
      () => {
        this.getImagenesProductos(producto_id);
      }
    );
  }

  getImagenesProductos(producto_id) {
    this.SrvProductos.getImagenesProductos(producto_id).subscribe((resp) => {
      console.log({ "SrvProductos.getImagenesProductos": resp });
      let cast: any = resp;
      this.imagenes = cast;
      this.cantidad_imagenes = cast.length;
    });
  }
}

interface ProductosCaracteristicas {
  caracteristicas_id: number;
  nombre: string;
  descripcion: string;
  valor: string;
}

interface Categorias {
  categorias_id: number;
  nombre: string;
  categoria_padre: string;
}

interface Imagenes {
  id: number;
  imagen: string;
  fecha_carga: string;
  orden: number;
  principal: boolean;
  productos_id: number;
}
