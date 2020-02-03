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
  ventaDetalles: VentasDetalle[] = [];

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