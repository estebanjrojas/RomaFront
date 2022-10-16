import { SnackBarService } from "src/app/core/ui/comunes/servicios/SnackBarService";
import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProductosService } from "../../../../../../comunes/servicios/productos.service";

@Component({
  selector: "app-precios-productos",
  templateUrl: "./precios-productos.component.html",
  styleUrls: ["./precios-productos.component.scss"],
})
export class PreciosProductosComponent implements OnInit {
  @Input() producto: any;

  preciosProductosForm: FormGroup;

  precios = new Array<Precios>();

  constructor(
    private SrvProductos: ProductosService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder
  ) {
    this.preciosProductosForm = this.formBuilder.group({
      nuevo_precio: ["", Validators.compose([])],
      precio_actual: ["", Validators.compose([])],
    });
  }

  ngOnInit() {
    this.mostrarPrecioActual(this.producto.productos_id);
  }

  async setform() {
    await this.preciosProductosForm.controls.nuevo_precio.reset;
    await this.mostrarPrecioActual(this.producto.productos_id);
    await this.getValoresTablaPrecios();
  }

  mostrarPrecioActual(productos_id) {
    this.SrvProductos.getUltimoPrecioValido(productos_id).subscribe((resp) => {
      let respuesta: any = resp;

      this.preciosProductosForm.patchValue({
        precio_actual: respuesta[0].monto,
      });
    });
    this.getValoresTablaPrecios();
  }

  cargarNuevoPrecio() {
    let precio = this.preciosProductosForm.controls.nuevo_precio.value;
    this.SrvProductos.actualizarFechaHastaPrecio(
      this.producto.productos_id
    ).subscribe(() => {
      this.SrvProductos.insertNuevoPrecioProducto(
        precio,
        this.producto.productos_id
      ).subscribe(() => {
        this.snackBar.mostrarMensaje("El Producto se ha CARGADO Exitosamente");
      });
    });
    this.setform();
  }

  getValoresTablaPrecios() {
    var Parent = document.getElementById("tabla_precios");
    while (Parent.hasChildNodes()) {
      Parent.removeChild(Parent.firstChild);
    }
    this.SrvProductos.getHistorialPrecios(this.producto.productos_id).subscribe(
      (resp) => {
        let respuesta: any = resp;

        for (let resp of respuesta)
          this.precios.push({
            monto: resp.monto,
            unidad: resp.unidad,
            fecha_desde: resp.fecha_desde,
            fecha_hasta: resp.fecha_hasta,
            productos_id: resp.productos_id,
          });
      }
    );
  }
}

interface Precios {
  monto: number;
  unidad: number;
  fecha_desde: string;
  fecha_hasta: string;
  productos_id: number;
}
