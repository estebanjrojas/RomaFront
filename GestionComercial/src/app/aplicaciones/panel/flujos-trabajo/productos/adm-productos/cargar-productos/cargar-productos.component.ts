import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProductosService } from "../../../../../../comunes/servicios/productos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SnackBarService } from "src/app/core/ui/comunes/servicios/SnackBarService";
import { CategoriasService } from "../../../../../../comunes/servicios/categorias.service";
import { Categorias } from "../../../../../../comunes/interfaces/Categorias";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: "app-cargar-productos",
  templateUrl: "./cargar-productos.component.html",
  styleUrls: ["./cargar-productos.component.scss"],
})
export class CargarProductosComponent implements OnInit {
  //Variables
  submitted: boolean = false;
  nomb_usr: string;

  caracteristicas = new Array<Caracteristica>();
  categorias_guardar = new Array<{ id: number; nombre: string }>();
  imagenes = new Array<{ imagen: string; predeterminada: boolean }>();

  indiceFotoPredeterminada = 0;
  cantidadFotos = 0;

  //Instancias
  productosForm: FormGroup;

  tipo_producto = new Array<{ id: number; descripcion: string }>();
  urls = new Array<string>();

  //Arbol de Categorias
  objetosArbolCategorias = [];
  jsonFinal: {
    producto_id: any;
    producto: any;
    caracteristicas: Caracteristica[];
    categorias: { id: number; nombre: string }[];
    imagenes: { imagen: string; predeterminada: boolean }[];
  };

  //Constructor
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService,
    private snackBar2: MatSnackBar,
    private SrvProductos: ProductosService,
    private SrvCategorias: CategoriasService
  ) {
    this.productosForm = this.formBuilder.group({
      codigo: ["", Validators.compose([Validators.required])],
      nombre_producto: ["", Validators.compose([Validators.required])],
      descripcion_producto: ["", Validators.compose([Validators.required])],
      tipo: ["", Validators.compose([Validators.required])],
      precio: ["", Validators.compose([Validators.required])],
      unidad: [],
      descripcion_factura: ["", Validators.compose([Validators.required])],
      nombre: ["", Validators.compose([])],
      descripcion: ["", Validators.compose([])],
      valor: ["", Validators.compose([])],
      nombre_usuario: ["", Validators.compose([])],
      id_producto: ["", Validators.compose([])],
      imagenes_input: ["", Validators.compose([])],
    });
  }

  ngOnInit() {
    this.productosForm.controls.unidad.setValue(1);

    this.nomb_usr = localStorage.getItem("roma_usuario");
    this.productosForm.controls.nombre_usuario.setValue(this.nomb_usr);
    this.route.params.subscribe((params) => {
      this.productosForm.controls.id_producto.setValue(params.productos_id);
    });

    this.getDatosProductos();

    this.SrvCategorias.obtenerJSONTodasCategorias().subscribe(
      (resp) => {
        let cast: any = resp;
        this.SrvCategorias.setCategorias(JSON.parse(cast.categorias));
      },
      (error) => {
        console.error(`Ha ocurrido un error: ${error}`);
      },
      () => {
        this.llenarArbolCategorias();
      }
    );

    //Lleno el combo de tipo producto
    this.SrvProductos.getTiposProductos().subscribe((respuesta) => {
      let cast: any = respuesta;
      for (var i = 0; i < cast.length; i++) {
        this.tipo_producto.push({
          id: cast[i].id,
          descripcion: cast[i].descripcion,
        });
      }
    });
  }

  getDatosProductos() {
    let id_producto = this.productosForm.controls.id_producto.value;
    if (id_producto != null || id_producto != undefined) {
      this.SrvProductos.getDatosProductos(id_producto).subscribe((resp) => {
        let respuesta: any = resp;

        this.productosForm.patchValue({
          codigo: respuesta[0].codigo,
          nombre_producto: respuesta[0].nombre,
          descripcion_producto: respuesta[0].descripcion,
          descripcion_factura: respuesta[0].descripcion_factura,
          tipo: respuesta[0].tipo_producto,
          precio: respuesta[0].monto,
        });
      });

      this.SrvProductos.getCaracteristicasProductos(id_producto).subscribe(
        (resp) => {
          let respuesta: any = resp;

          for (let resp of respuesta)
            this.caracteristicas.push({
              nombre: resp.nombre,
              descripcion: resp.descripcion,
              valor: resp.valor,
            });
        }
      );

      this.SrvProductos.getCategoriasProductos(id_producto).subscribe(
        (resp) => {
          let respuesta: any = resp;

          for (let resp of respuesta)
            this.categorias_guardar.push({
              id: resp.categorias_id,
              nombre: resp.nombre,
            });
        }
      );

      this.SrvProductos.getFotosCargadas(id_producto).subscribe((respuesta) => {
        let cast: any = respuesta;
        for (let i = 0; i < cast.length; i++) {
          this.urls[i] = cast[i].imagen;
          this.imagenes[i] = {
            imagen: cast[i].imagen,
            predeterminada: cast[i].principal,
          };
          if (cast[i].principal == true)
            document.getElementsByName("predeterminada")[i];
        }
        this.cantidadFotos = cast.length;
      });
    }
  }

  llenarArbolCategorias() {
    let categoriasData: any[] = this.SrvCategorias.getCategorias();
    this.objetosArbolCategorias = categoriasData;
  }

  actualizarSeleccionCategoria(categoriaSeleccionada) {
    this.agregarCategoria(
      categoriaSeleccionada.id,
      categoriaSeleccionada.label
    );
  }

  agregarDatosTablita() {
    var _nom = this.productosForm.controls.nombre.value;
    var _descrip = this.productosForm.controls.descripcion.value;
    var _val = this.productosForm.controls.valor.value;

    if (_nom != null && _descrip.length != 0 && _val.length != 0) {
      this.caracteristicas.push({
        nombre: _nom,
        descripcion: _descrip,
        valor: _val,
      });
      this.productosForm.controls.nombre.reset();
      this.productosForm.controls.descripcion.reset();

      this.productosForm.controls.valor.reset();
    } else {
      this.snackBar.mostrarMensaje("Todos los campos son obligatorios...");
      document.getElementById("nombretablita").focus();
    }
  }

  borrarFilaCaracteristicas(value) {
    var array = this.caracteristicas;
    array.splice(value, 1);
  }

  detectFiles(event) {
    //this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let indice = 0;
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.imagenes.push({
            imagen: reader.result.toString(),
            predeterminada: indice == this.indiceFotoPredeterminada,
          });
          indice++;
          this.cantidadFotos = this.cantidadFotos + indice;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  quitarFoto(posicion) {
    this.imagenes.splice(posicion, 1);
    this.urls.splice(posicion, 1);
  }

  setFotoPredeterminada(posicion) {
    this.indiceFotoPredeterminada = posicion;
    for (let i = 0; i < this.imagenes.length; i++) {
      if (i == this.indiceFotoPredeterminada) {
        this.imagenes[i].predeterminada = true;
      } else {
        this.imagenes[i].predeterminada = false;
      }
    }
  }

  //Guardar Nuevo Producto
  guardarV2() {
    let id_producto = this.productosForm.controls.id_producto.value;
    this.jsonFinal = {
      producto_id: id_producto,
      producto: this.productosForm.value,
      caracteristicas: this.caracteristicas,
      categorias: this.categorias_guardar,
      imagenes: this.imagenes,
    };

    if (this.productosForm.valid) {
      if (id_producto == null || id_producto == undefined) {
        //Insertar Producto
        this.submitted = true;
        try {
          this.SrvProductos.insertProducto(this.jsonFinal).subscribe(
            (respuesta) => {
              console.log({ "SrvProductos.insertProducto": respuesta });
            },
            (err) => {
              console.log({ err: err });
            },
            () => {
              this.mostrarMensajeInformativo(
                "El producto se ha insertado correctamente... "
              );
            }
          );
        } catch (error) {
          this.mostrarMensajeError(
            "Ocurrió un error al intentar guardar el producto... " + error
          );
        }
      } else {
        //Modificar Producto
        this.SrvProductos.updateProducto(this.jsonFinal).subscribe(
          (respuesta) => {
            console.log({ "SrvProductos.updateProducto": respuesta });
          },
          (err) => {
            console.log({ err: err });
          },
          () => {
            this.mostrarMensajeInformativo(
              "El producto se actualizó exitosamente"
            );
          }
        );
      }
    } else {
      this.productosForm.getError;
      this.mostrarMensajeError("Existen campos obligatorios sin completar... ");
    }
  }

  //Guardar Nuevo Producto
  // guardar() {
  //   let id_producto = this.productosForm.controls.id_producto.value;

  //   if (id_producto == null || id_producto == undefined) {
  //     this.submitted = true;
  //     if (this.productosForm.valid) {
  //       this.SrvProductos.insertProductoReturnId(
  //         this.productosForm.value
  //       ).subscribe((respuesta) => {
  //         let cast: any = respuesta;

  //         for (let caract of this.caracteristicas) {
  //           this.SrvProductos.insertCaracteristicasProducto(
  //             caract,
  //             cast.id
  //           ).subscribe((resp) => {
  //             console.log({
  //               "SrvProductos.insertCaracteristicasProducto": resp,
  //             });
  //             this.snackBar.mostrarMensaje(
  //               "Caracteristicas cargadas exitosamente"
  //             );
  //           });
  //         }
  //         for (let cat of this.categorias_guardar) {
  //           this.SrvProductos.insertCategoriasProducto(cat, cast.id).subscribe(
  //             () => {
  //               this.snackBar.mostrarMensaje(
  //                 "Categorias cargadas exitosamente"
  //               );
  //             }
  //           );
  //         }

  //         for (let imagen of this.imagenes) {
  //           this.SrvProductos.cargarImagenProducto(imagen, cast.id).subscribe(
  //             () => {
  //               this.snackBar.mostrarMensaje("Imagenes cargadas exitosamente");
  //             }
  //           );
  //         }
  //         this.snackBar.mostrarMensaje(
  //           "El Producto se ha CARGADO Exitosamente"
  //         );
  //         this.productosForm.reset();
  //         while (this.caracteristicas.length > 0) {
  //           this.caracteristicas.pop();
  //         }
  //       });
  //     } else {
  //       this.productosForm.getError;
  //     }
  //   } else {
  //     //Modificar Producto
  //     if (this.productosForm.valid) {
  //       this.SrvProductos.actualizarDatosProductos(
  //         this.productosForm.value
  //       ).subscribe(() => {
  //         this.SrvProductos.eliminarCaracteristicasProductos(
  //           id_producto
  //         ).subscribe(() => {
  //           for (let caract of this.caracteristicas) {
  //             this.SrvProductos.insertCaracteristicasProducto(
  //               caract,
  //               id_producto
  //             ).subscribe(() => {
  //               this.snackBar.mostrarMensaje(
  //                 "Caracteristicas actualizadas exitosamente"
  //               );
  //             });
  //           }

  //           for (let cat of this.categorias_guardar) {
  //             this.SrvProductos.insertCategoriasProducto(
  //               cat,
  //               id_producto
  //             ).subscribe((resp) => {
  //               this.snackBar.mostrarMensaje(
  //                 "Categorias actualizadas exitosamente"
  //               );
  //             });
  //           }

  //           this.SrvProductos.eliminarImagenesProductos(id_producto).subscribe(
  //             (resp) => {
  //               for (let imagen of this.imagenes) {
  //                 this.SrvProductos.cargarImagenProducto(
  //                   imagen,
  //                   id_producto
  //                 ).subscribe((resp) => {
  //                   this.snackBar.mostrarMensaje(
  //                     "Imagenes cargadas exitosamente"
  //                   );
  //                 });
  //               }

  //               this.snackBar.mostrarMensaje(
  //                 "La imagen se ha ACTUALIZADO Exitosamente"
  //               );
  //             }
  //           );

  //           this.snackBar.mostrarMensaje(
  //             "El producto se ha ACTUALIZADO Exitosamente"
  //           );
  //           this.productosForm.reset();
  //           this.router.navigate(["productos/busqueda-productos"]);
  //         });
  //       });
  //     } else {
  //       this.productosForm.getError;
  //     }
  //   }
  // }

  agregarCategoria(id: number, nombre: string) {
    const objetoAgregar = { id: id, nombre: nombre };
    this.categorias_guardar = this.categorias_guardar.filter(
      (objeto) => objeto.id !== objetoAgregar.id
    );
    this.categorias_guardar.push({ id: id, nombre: nombre });
  }

  borrarFilaCategoria(value) {
    var array = this.categorias_guardar;
    array.splice(value, 1);
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

interface Caracteristica {
  nombre: Text;
  descripcion: Text;
  valor: any;
}

/**
 * Estructura anidada para los datos de las categorias
 * Cada nodo tiene una opcion y una lista de hijos
 */
interface CategoriasNode {
  id?: number;
  name: string;
  children?: CategoriasNode[];
}

interface Tabgral {
  codigo: string;
  descrip: string;
}
