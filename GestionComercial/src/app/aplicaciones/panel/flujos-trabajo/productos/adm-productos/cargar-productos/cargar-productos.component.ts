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
import { TabgralService } from "../../../../../../comunes/servicios/tabgral.service";

import { CategoriasService } from "../../../../../../comunes/servicios/categorias.service";
import { Categorias } from "../../../../../../comunes/interfaces/Categorias";

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

  tipo_producto = new Array<Tabgral>();
  urls = new Array<string>();

  //Arbol de Categorias
  objetosArbolCategorias = [];

  //Constructor
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService,
    private SrvTabgral: TabgralService,
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
      console.log(params);
    });

    this.getDatosProductos();

    this.SrvCategorias.obtenerJSONTodasCategorias().subscribe(
      (resp) => {
        console.log({ "SrvCategorias.obtenerJSONTodasCategorias": resp });
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
    this.SrvTabgral.selectByNroTab(7).subscribe((respuesta) => {
      console.log({ "SrvTabgral.selectByNroTab(7)": respuesta });
      let cast: any = respuesta;
      for (var i = 0; i < cast.length; i++) {
        let rel: Tabgral = { codigo: "0", descrip: "" };
        rel.codigo = cast[i].codigo;
        rel.descrip = cast[i].descrip;
        this.tipo_producto.push(rel);
      }
    });
  }

  getDatosProductos() {
    let id_producto = this.productosForm.controls.id_producto.value;
    if (id_producto != null || id_producto != undefined) {
      this.SrvProductos.getDatosProductos(id_producto).subscribe((resp) => {
        let respuesta: any = resp;
        console.log({ "SrvProductos.getDatosProductos": respuesta });

        this.productosForm.patchValue({
          codigo: respuesta[0].codigo,
          nombre_producto: respuesta[0].nombre,
          descripcion_producto: respuesta[0].descripcion,
          descripcion_factura: respuesta[0].descripcion_factura,
          tipo: respuesta[0].tipo_producto,
          precio: respuesta[0].monto,
        });
        console.log("Tipo Producto: " + this.productosForm.controls.tipo.value);
      });

      this.SrvProductos.getCaracteristicasProductos(id_producto).subscribe(
        (resp) => {
          let respuesta: any = resp;
          console.log({
            "SrvProductos.getCaracteristicasProductos": respuesta,
          });

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
          console.log({ "SrvProductos.getCategoriasProductos": respuesta });

          for (let resp of respuesta)
            this.categorias_guardar.push({
              id: resp.categorias_id,
              nombre: resp.nombre,
            });
        }
      );

      this.SrvProductos.getFotosCargadas(id_producto).subscribe((respuesta) => {
        console.log({ "SrvProductos.getFotosCargadas": respuesta });
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

  borrarFila(value) {
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
          //console.log(this.imagenes[indice]);
          indice++;
          this.cantidadFotos = this.cantidadFotos + indice;
        };
        reader.readAsDataURL(file);
      }
    }
    console.log(this.urls);
  }

  quitarFoto(posicion) {
    console.log("Posicion: " + posicion);
    this.imagenes.splice(posicion, 1);
    this.urls.splice(posicion, 1);
    console.log(this.imagenes);
  }

  setFotoPredeterminada(posicion) {
    console.log({ "foto predeterminada": posicion });
    this.indiceFotoPredeterminada = posicion;
    for (let i = 0; i < this.imagenes.length; i++) {
      if (i == this.indiceFotoPredeterminada) {
        this.imagenes[i].predeterminada = true;
      } else {
        this.imagenes[i].predeterminada = false;
      }
    }
    console.log(JSON.stringify(this.imagenes[this.indiceFotoPredeterminada]));
  }

  //Guardar Nuevo Producto
  guardar() {
    let id_producto = this.productosForm.controls.id_producto.value;

    if (id_producto == null || id_producto == undefined) {
      this.submitted = true;
      if (this.productosForm.valid) {
        console.log(JSON.stringify(this.productosForm.value));
        this.SrvProductos.insertProductoReturnId(
          this.productosForm.value
        ).subscribe((respuesta) => {
          console.log({ "SrvProductos.insertProductoReturnId": respuesta });
          let cast: any = respuesta;

          for (let caract of this.caracteristicas) {
            this.SrvProductos.insertCaracteristicasProducto(
              caract,
              cast.id
            ).subscribe((resp) => {
              console.log({
                "SrvProductos.insertCaracteristicasProducto": resp,
              });
              this.snackBar.mostrarMensaje(
                "Caracteristicas cargadas exitosamente"
              );
            });
          }
          for (let cat of this.categorias_guardar) {
            this.SrvProductos.insertCategoriasProducto(cat, cast.id).subscribe(
              (resp) => {
                console.log({ "SrvProductos.insertCategoriasProducto": resp });
                this.snackBar.mostrarMensaje(
                  "Categorias cargadas exitosamente"
                );
              }
            );
          }

          for (let imagen of this.imagenes) {
            this.SrvProductos.cargarImagenProducto(imagen, cast.id).subscribe(
              (resp) => {
                console.log({ "SrvProductos.cargarImagenProducto": resp });
                this.snackBar.mostrarMensaje("Imagenes cargadas exitosamente");
              }
            );
          }
          this.snackBar.mostrarMensaje(
            "El Producto se ha CARGADO Exitosamente"
          );
          this.productosForm.reset();
          while (this.caracteristicas.length > 0) {
            this.caracteristicas.pop();
          }
        });
      } else {
        this.productosForm.getError;
        console.log(this.productosForm);
      }
    } else {
      //Modificar Producto
      if (this.productosForm.valid) {
        console.log(JSON.stringify(this.productosForm.value));
        this.SrvProductos.actualizarDatosProductos(
          this.productosForm.value
        ).subscribe((respuesta) => {
          console.log({ "SrvAvisos.actualizarDatosProductos": respuesta });

          this.SrvProductos.eliminarCaracteristicasProductos(
            id_producto
          ).subscribe((respuesta) => {
            console.log({
              "SrvProductos.eliminarCaracteristicasProductos": respuesta,
            });

            for (let caract of this.caracteristicas) {
              this.SrvProductos.insertCaracteristicasProducto(
                caract,
                id_producto
              ).subscribe((resp) => {
                console.log({
                  "SrvProductos.insertCaracteristicasProducto": resp,
                });
                this.snackBar.mostrarMensaje(
                  "Caracteristicas actualizadas exitosamente"
                );
              });
            }

            for (let cat of this.categorias_guardar) {
              this.SrvProductos.insertCategoriasProducto(
                cat,
                id_producto
              ).subscribe((resp) => {
                console.log({ "SrvProductos.insertCategoriasProducto": resp });
                this.snackBar.mostrarMensaje(
                  "Categorias actualizadas exitosamente"
                );
              });
            }

            this.SrvProductos.eliminarImagenesProductos(id_producto).subscribe(
              (resp) => {
                console.log({ "SrvProductos.eliminarImagenesProductos": resp });

                for (let imagen of this.imagenes) {
                  this.SrvProductos.cargarImagenProducto(
                    imagen,
                    id_producto
                  ).subscribe((resp) => {
                    console.log({ "SrvProductos.cargarImagenProducto": resp });
                    this.snackBar.mostrarMensaje(
                      "Imagenes cargadas exitosamente"
                    );
                  });
                }

                this.snackBar.mostrarMensaje(
                  "La imagen se ha ACTUALIZADO Exitosamente"
                );
              }
            );

            this.snackBar.mostrarMensaje(
              "El producto se ha ACTUALIZADO Exitosamente"
            );
            this.productosForm.reset();
            this.router.navigate(["productos/busqueda-productos"]);
          });
        });
      } else {
        this.productosForm.getError;
        console.log(this.productosForm);
      }
    }
  }

  agregarCategoria(id: number, nombre: string) {
    const objetoAgregar = { id: id, nombre: nombre };
    this.categorias_guardar = this.categorias_guardar.filter(
      (objeto) => objeto.id !== objetoAgregar.id
    );
    this.categorias_guardar.push({ id: id, nombre: nombre });
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