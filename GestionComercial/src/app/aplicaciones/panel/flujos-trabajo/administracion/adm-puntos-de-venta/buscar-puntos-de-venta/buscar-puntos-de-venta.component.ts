import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PuntosVentaService } from "src/app/comunes/servicios/puntos-venta.service";
import { SucursalesService } from "src/app/comunes/servicios/sucursales.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buscar-puntos-de-venta",
  templateUrl: "./buscar-puntos-de-venta.component.html",
  styleUrls: ["./buscar-puntos-de-venta.component.scss"],
})
export class BuscarPuntosDeVentaComponent implements OnInit {
  buscarPuntosVentaForm: FormGroup;
  cast: any;
  sucursales = new Array<{ id: number; nombre: string }>();

  constructor(
    private SrvPuntosVenta: PuntosVentaService,
    private formBuilder: FormBuilder,
    private SrvSucursales: SucursalesService
  ) {
    this.buscarPuntosVentaForm = this.formBuilder.group({
      nombre_usuario: ["", Validators.compose([])],
      txtBuscar: [],
    });
  }

  ngOnInit() {
    this.buscarPuntosVenta();

    //Llenado combo Sucursal
    this.SrvSucursales.selectAbiertas().subscribe((respuesta) => {
      let cast: any = respuesta;
      for (var i = 0; i < cast.length; i++) {
        this.sucursales.push({ id: cast[i].id, nombre: cast[i].nombre });
      }
    });
  }

  buscarPuntosVenta() {
    let busqueda = this.buscarPuntosVentaForm.controls.txtBuscar.value;
    if (busqueda == undefined || busqueda == "") {
      this.SrvPuntosVenta.getPuntosVentaTodos().subscribe((respuesta) => {
        this.cast = respuesta;
      });
    } else {
      this.SrvPuntosVenta.getPuntosVentaBusqueda(busqueda).subscribe(
        (respuesta) => {
          this.cast = respuesta;
        }
      );
    }
  }
}
