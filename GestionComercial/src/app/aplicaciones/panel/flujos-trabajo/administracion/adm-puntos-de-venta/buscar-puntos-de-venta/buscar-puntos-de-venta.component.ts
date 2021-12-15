import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { PuntosVentaService } from "src/app/comunes/servicios/puntos-venta.service";
import { TabgralService } from "src/app/comunes/servicios/tabgral.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buscar-puntos-de-venta",
  templateUrl: "./buscar-puntos-de-venta.component.html",
  styleUrls: ["./buscar-puntos-de-venta.component.scss"],
})
export class BuscarPuntosDeVentaComponent implements OnInit {
  buscarPuntosVentaForm: FormGroup;
  cast: any;

  sucursales = new Array<Tabgral>();

  constructor(
    private SrvPuntosVenta: PuntosVentaService,
    private SrvTabgral: TabgralService,
    private formBuilder: FormBuilder
  ) {
    this.buscarPuntosVentaForm = this.formBuilder.group({
      nombre_usuario: ["", Validators.compose([])],
      txtBuscar: [],
    });
  }

  ngOnInit() {
    this.buscarPuntosVenta();

    //Llenado combo Sucursal
    this.SrvTabgral.selectByNroTab(6).subscribe((respuesta) => {
      console.log({ "SrvTabgral.selectByNroTab(6)": respuesta });
      let cast: any = respuesta;
      for (var i = 0; i < cast.length; i++) {
        let rel: Tabgral = { codigo: "0", descrip: "" };
        rel.codigo = cast[i].codigo;
        rel.descrip = cast[i].descrip;
        // console.log("rel "+rel);
        this.sucursales.push(rel);
      }
      //this.fallecidosForm.controls.sala.setValue(1);
    });
  }

  buscarPuntosVenta() {
    let busqueda = this.buscarPuntosVentaForm.controls.txtBuscar.value;
    if (busqueda == undefined || busqueda == "") {
      this.SrvPuntosVenta.getPuntosVentaTodos().subscribe((respuesta) => {
        this.cast = respuesta;
        console.log({ "SrvPuntosVenta.getPuntosVentaTodos": this.cast });
      });
    } else {
      this.SrvPuntosVenta.getPuntosVentaBusqueda(busqueda).subscribe(
        (respuesta) => {
          this.cast = respuesta;
          console.log({ "SrvPuntosVenta.getPuntosVentaBusqueda": this.cast });
        }
      );
    }
  }
}

interface Tabgral {
  codigo: string;
  descrip: string;
}
