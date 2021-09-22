import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/servicios/ventas.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rendimiento-diario-chart',
  templateUrl: './rendimiento-diario-chart.component.html',
  styleUrls: ['./rendimiento-diario-chart.component.css']
})
export class RendimientoDiarioChartComponent implements OnInit {
  
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public total = 0;

  private fecha;
  constructor(private SrvVentas: VentasService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.fecha = new Date();
    console.log(this.datePipe.transform(this.fecha, 'yyyy-MM-dd'));
    this.calcularChart();
  }

  setFecha(event){
    this.fecha = event.target.value;
    this.calcularChart();
  }


  calcularChart(){
    this.total = 0;
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.SrvVentas.getVentasDiariasEmpleados(this.datePipe.transform(this.fecha, 'yyyy-MM-dd')).subscribe(resp => {
      let cast: any = resp;
      this.pieChartData = cast.map(venta => venta.total_vendido);
      this.pieChartLabels = cast.map(venta => venta.nombre);
      this.pieChartData.forEach(monto => {this.total = this.total + monto});
    })
  }

}
