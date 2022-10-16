import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { PuntosVentaService } from "src/app/comunes/servicios/puntos-venta.service";
import { TabgralService } from "src/app/comunes/servicios/tabgral.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SnackBarService } from "src/app/core/ui/comunes/servicios/SnackBarService";

@Component({
  selector: "app-cargar-puntos-de-venta",
  templateUrl: "./cargar-puntos-de-venta.component.html",
  styleUrls: ["./cargar-puntos-de-venta.component.scss"],
})
export class CargarPuntosDeVentaComponent implements OnInit {
  //Instancias
  puntosVentaForm: FormGroup;

  nomb_usr: string;

  tipo_factura = new Array<Tabgral>();
  sucursales = new Array<Tabgral>();

  caracteristicas = new Array<Caracteristica>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService,
    private SrvTabgral: TabgralService,
    private SrvPuntosVenta: PuntosVentaService
  ) {
    this.puntosVentaForm = this.formBuilder.group({
      sucursal: ["", Validators.compose([Validators.required])],
      numero: ["", Validators.compose([Validators.required])],
      fecha_alta: ["", Validators.compose([Validators.required])],
      tipo: ["", Validators.compose([])],
      ultimo_nro_factura: ["", Validators.compose([])],
      nombre_usuario: ["", Validators.compose([Validators.required])],
      id_punto_venta: ["", Validators.compose([])],
      por_defecto: ["", Validators.compose([])],
    });
  }

  ngOnInit() {
    this.nomb_usr = localStorage.getItem("nomb_usr");
    this.puntosVentaForm.controls.nombre_usuario.setValue(this.nomb_usr);

    this.route.params.subscribe((params) => {
      this.puntosVentaForm.controls.id_punto_venta.setValue(
        params.puntos_venta_id
      );
    });

    //Lleno el combo de tipo
    this.SrvTabgral.selectByNroTab(5).subscribe((respuesta) => {
      let cast: any = respuesta;
      for (var i = 0; i < cast.length; i++) {
        let rel: Tabgral = { codigo: "0", descrip: "" };
        rel.codigo = cast[i].codigo;
        rel.descrip = cast[i].descrip;
        this.tipo_factura.push(rel);
      }
    });

    //Llenado combo Sucursal
    this.SrvTabgral.selectByNroTab(6).subscribe((respuesta) => {
      let cast: any = respuesta;
      for (var i = 0; i < cast.length; i++) {
        let rel: Tabgral = { codigo: "0", descrip: "" };
        rel.codigo = cast[i].codigo;
        rel.descrip = cast[i].descrip;
        this.sucursales.push(rel);
      }
    });

    this.getDatosPuntosVenta();
  }

  agregarDatosTablita() {
    var _tipo = this.puntosVentaForm.controls.tipo.value;
    var _ultimo_nro = this.puntosVentaForm.controls.ultimo_nro_factura.value;
    var _por_defecto = this.puntosVentaForm.controls.por_defecto.value;

    if (_tipo != 0 && _tipo != undefined && _ultimo_nro.length != 0) {
      this.caracteristicas.push({
        tipo: _tipo.codigo,
        tipo_descrip: _tipo.descrip,
        ultimo_nro: _ultimo_nro,
        por_defecto: _por_defecto,
      });
      this.puntosVentaForm.controls.tipo.reset();
      this.puntosVentaForm.controls.ultimo_nro_factura.reset();
      this.puntosVentaForm.controls.por_defecto.reset();
    } else {
      alert("Todos los campos son obligatorios...");
      this.snackBar.mostrarMensaje("Todos los campos son obligatorios...");
      document.getElementById("nombretablita").focus();
    }
  }

  borrarFila(value) {
    var array = this.caracteristicas;
    array.splice(value, 1);
  }

  validarTrue() {
    let unico_true = false;
    for (let caract of this.caracteristicas) {
      if (unico_true == false) {
        caract.por_defecto = true;
        unico_true = true;
      } else {
        caract.por_defecto = false;
      }
    }
  }

  //Guardar Nuevo Punto de Venta
  guardar() {
    let id_punto_venta = this.puntosVentaForm.controls.id_punto_venta.value;

    if (id_punto_venta == null || id_punto_venta == undefined) {
      if (this.puntosVentaForm.valid) {
        this.SrvPuntosVenta.insertPuntoVentaReturnId(
          this.puntosVentaForm.value
        ).subscribe((respuesta) => {
          let cast: any = respuesta;

          for (let caract of this.caracteristicas) {
            this.SrvPuntosVenta.insertCaracteristicasPuntoVenta(
              caract,
              cast.id
            ).subscribe(() => {
              this.snackBar.mostrarMensaje(
                "Caracteristicas cargadas exitosamente"
              );
            });
          }
          this.snackBar.mostrarMensaje(
            "El Punto de Venta se ha CARGADO Exitosamente"
          );
          alert("El Punto de Venta se ha CARGADO Exitosamente");
          this.puntosVentaForm.reset();

          for (let i = 0; i < this.caracteristicas.length; i++) {
            this.caracteristicas.splice(i, 100);
          }
        });
      } else {
        this.puntosVentaForm.getError;
      }
    } else {
      //Modificar Punto de Venta
      if (this.puntosVentaForm.valid) {
        this.SrvPuntosVenta.actualizarDatosPuntoVenta(
          this.puntosVentaForm.value
        ).subscribe(() => {
          this.SrvPuntosVenta.eliminarCaracteristicasPuntoVenta(
            id_punto_venta
          ).subscribe(() => {
            for (let caract of this.caracteristicas) {
              this.SrvPuntosVenta.insertCaracteristicasPuntoVenta(
                caract,
                id_punto_venta
              ).subscribe(() => {
                this.snackBar.mostrarMensaje(
                  "Caracteristicas cargadas exitosamente"
                );
              });
            }

            this.snackBar.mostrarMensaje(
              "El Punto de Venta se ha ACTUALIZADO Exitosamente"
            );
            this.puntosVentaForm.reset();
            this.router.navigate(["puntos-venta/busqueda-puntos-venta"]);
          });
        });
      } else {
        this.puntosVentaForm.getError;
      }
    }
  }

  getDatosPuntosVenta() {
    let id_punto_venta = this.puntosVentaForm.controls.id_punto_venta.value;
    if (id_punto_venta != null || id_punto_venta != undefined) {
      this.SrvPuntosVenta.getDatosPuntosVenta(id_punto_venta).subscribe(
        (resp) => {
          let respuesta: any = resp;
          this.puntosVentaForm.patchValue({
            sucursal: respuesta[0].sucursal,
            numero: respuesta[0].numero,
            fecha_alta: respuesta[0].fecha_alta,
          });
          this.puntosVentaForm.controls.sucursal.setValue(
            respuesta[0].sucursal
          );
        }
      );

      this.SrvPuntosVenta.getCaracteristicasPuntosVenta(
        id_punto_venta
      ).subscribe((resp) => {
        let respuesta: any = resp;
        for (let resp of respuesta)
          this.caracteristicas.push({
            tipo: resp.tipo_comprobante,
            tipo_descrip: resp.descripcion,
            ultimo_nro: resp.ultimo_numero,
            por_defecto: resp.defecto,
          });
      });
    }
  }

  volver() {
    this.router.navigate(["puntos-venta/busqueda-puntos-venta"]);
  }

  obtenerNroComprobanteWS(punto_venta_id, tipo_comprobante) {}
}

interface Caracteristica {
  tipo: any;
  tipo_descrip: any;
  ultimo_nro: number;
  por_defecto: any;
}

interface Tabgral {
  codigo: string;
  descrip: string;
}
