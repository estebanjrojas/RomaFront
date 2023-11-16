import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { DetalleVentasDialogService } from "./detalle-ventas-dialog.service";
import { VentasService } from "../../../../../comunes/servicios/ventas.service";
import { FacturasService } from "../../../../../comunes/servicios/facturas.service";
import { saveAs } from "node_modules/file-saver/src/FileSaver.js";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: "app-detalle-ventas-dialog",
  templateUrl: "./detalle-ventas-dialog.component.html",
  styleUrls: ["./detalle-ventas-dialog.component.scss"],
})
export class DetalleVentasDialogComponent {
  ventasId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private SrvVentas: VentasService,
    private SrvFacturas: FacturasService,
    private snackBar2: MatSnackBar,
    private srvDialog: DetalleVentasDialogService
  ) {
    this.ventasId = datos.ventasId;
  }

  venta: VentasInterface = {
    ventas_id: 0,
    fecha: "",
    apellido_cliente: "",
    nombre_cliente: "",
    fecha_anulacion: "",
    usuario_anulacion: "",
    anulada: false,
    monto_total: 0,
  };
  ventaDetalles: VentasDetalleInterface[] = [];

  factura: FacturasInterface = {
    facturas_id: 0,
    fecha_emision: "",
    fecha_vencimiento: "",
    punto_venta: "",
    numero: "",
    cae: "",
    cai: "",
    monto_iva: 0,
    monto_neto: 0,
    monto_total: 0,
    tipo: "",
    vencimiento_cae: "",
    vencimiento_cai: "",
  };

  ngOnInit(): void {
    this.SrvVentas.getVentaPorId(this.ventasId).subscribe(
      (resp) => {
        let cast: any = resp;
        this.venta.ventas_id = this.ventasId;
        this.venta.fecha = cast[0].fecha;
        this.venta.monto_total = cast[0].monto;
        this.venta.usuario_anulacion = cast[0].usuario_anulacion;
        this.venta.apellido_cliente = cast[0].apellido_cliente;
        this.venta.nombre_cliente = cast[0].nombre_cliente;
        this.venta.anulada = cast[0].anulada;
        this.venta.fecha_anulacion = cast[0].fecha_anulacion;
        this.venta.usuario_anulacion = cast[0].usuario_anulacion;
        this.factura.facturas_id = cast[0].facturas_id;
        this.factura.tipo = cast[0].tipo_factura;
        this.factura.fecha_emision = cast[0].fecha_emision_factura;
        this.factura.fecha_vencimiento = cast[0].fecha_vencimiento_cae;
        this.factura.punto_venta = cast[0].punto_venta_factura;
        this.factura.numero = cast[0].numero_factura;
        this.factura.monto_total = cast[0].monto_total_factura;
        this.factura.monto_neto = cast[0].monto_neto_factura;
        this.factura.monto_iva = cast[0].monto_iva_factura;
        this.factura.cae = cast[0].cae;
        this.factura.cai = cast[0].cai;
        this.factura.vencimiento_cae = cast[0].fecha_vencimiento_cae;
        this.factura.vencimiento_cai = cast[0].fecha_vencimiento_cai;
      },
      (err) => {
        console.error("Error al obtener los datos de la venta: " + err.message);
      },
      () => {
        this.SrvVentas.getDetalleVentaPorVentasId(this.ventasId).subscribe(
          (resd) => {
            let cast: any = resd;
            cast.forEach((det) => {
              this.ventaDetalles.push({
                ventas_detalle_id: det.ventas_detalle_id,
                cantidad: det.cantidad,
                monto_unidad: det.monto_unidad,
                subtotal: det.subtotal,
                codigo_producto: det.codigo,
                nombre_producto: det.nombre,
                descripcion_producto: det.descripcion,
                descripcion_factura_producto: det.descripcion_factura,
                tipo_producto: det.tipo_producto,
              });
            });
          },
          (err) => {
            this.mostrarMensajeError("Sin resultados");
            this.srvDialog.closeDialog();
          }
        );
      }
    );
  }

  imprimirFactura(id) {
    this.SrvFacturas.getFacturaPDF(id).subscribe((respuesta) => {
      let cast: any = respuesta;
      var blob = new Blob(cast, {
        type: "application/pdf", // must match the Accept type
      });
      saveAs(blob, "invoice.pdf");
    });
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

interface VentasInterface {
  ventas_id: number;
  fecha: string;
  apellido_cliente: string;
  nombre_cliente: string;
  monto_total: number;
  anulada: boolean;
  fecha_anulacion: string;
  usuario_anulacion: string;
}

interface VentasDetalleInterface {
  ventas_detalle_id: number;
  cantidad: number;
  monto_unidad: number;
  subtotal: number;
  codigo_producto: string;
  nombre_producto: string;
  descripcion_producto: string;
  descripcion_factura_producto: string;
  tipo_producto: string;
}

interface FacturasInterface {
  facturas_id: number;
  tipo: string;
  punto_venta: string;
  numero: string;
  fecha_emision: string;
  fecha_vencimiento: string;
  cae: string;
  vencimiento_cae: string;
  cai: string;
  vencimiento_cai: string;
  monto_total: number;
  monto_neto: number;
  monto_iva: number;
}
