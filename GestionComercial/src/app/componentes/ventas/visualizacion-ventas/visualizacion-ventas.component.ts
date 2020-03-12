import { Component, OnInit, Input } from '@angular/core';
import { Ventas } from '../../../modelos/Ventas';
import { Clientes } from '../../../modelos/Clientes';
import { Personas } from '../../../modelos/Personas';
import { VentasDetalle } from '../../../modelos/VentasDetalle';
import { VentasService } from '../../../servicios/ventas.service';
@Component({
  selector: 'app-visualizacion-ventas',
  templateUrl: './visualizacion-ventas.component.html',
  styleUrls: ['./visualizacion-ventas.component.css']
})
export class VisualizacionVentasComponent implements OnInit {

  constructor(private SrvVentas: VentasService) { }

  @Input() ventas_id : number;

  venta : VentasInterface = {
    ventas_id : 0,
    fecha: '',
    apellido_cliente : '',
    nombre_cliente : '',
    fecha_anulacion : '',
    usuario_anulacion : '',
    anulada : '', 
    monto_total: 0

  };
  ventaDetalles: VentasDetalleInterface[] = [];

  ngOnInit() {
    this.SrvVentas.getVentaPorId(this.ventas_id).subscribe(resp => {
      let cast : any = resp;
      console.log(cast);
      this.venta.ventas_id = this.ventas_id;
      this.venta.fecha = cast[0].fecha;
      this.venta.monto_total = cast[0].monto;
      this.venta.usuario_anulacion = cast[0].usuario_anulacion;
      this.venta.apellido_cliente = cast[0].apellido_cliente;
      this.venta.nombre_cliente = cast[0].nombre_cliente;
      this.venta.anulada = cast[0].anulada;
      this.venta.fecha_anulacion = cast[0].fecha_anulacion;
      this.venta.usuario_anulacion = cast[0].usuario_anulacion;

    }, err => {
      console.log('Error al obtener los datos de la venta: '+err.message);
    }, ()=> {
      this.SrvVentas.getDetalleVentaPorVentasId(this.ventas_id).subscribe(resd => {
        
        let cast : any = resd;
        cast.forEach(det => {
          this.ventaDetalles.push({
            ventas_detalle_id : det.ventas_detalle_id,
            cantidad: det.cantidad,
            monto_unidad: det.monto_unidad,
            subtotal: det.subtotal,
            codigo_producto: det.codigo,
            nombre_producto: det.nombre,
            descripcion_producto: det.descripcion,
            descripcion_factura_producto: det.descripcion_factura,
            tipo_producto: det.tipo_producto
          });
        });
      });
    })

  }

}




interface VentasInterface {
  ventas_id: number;
  fecha: string;
  apellido_cliente: string;
  nombre_cliente: string;
  monto_total: number;
  anulada: string;
  fecha_anulacion: string;
  usuario_anulacion: string;
}

interface VentasDetalleInterface {
  ventas_detalle_id : number;
  cantidad: number;
  monto_unidad: number;
  subtotal: number;
  codigo_producto: string;
  nombre_producto: string;
  descripcion_producto: string;
  descripcion_factura_producto: string;
  tipo_producto: string;
}

interface Facturas {
  facturas_id : number;
  tipo : string;
  punto_venta : string;
  numero : string;
  fecha_emision : string;
  fecha_vencimiento : string;
  cae : string;
  vencimiento_cae : string;
  cai : string;
  vencimiento_cai: string;
  monto_total : number;
  monto_neto : number;
  monto_iva : number;
}