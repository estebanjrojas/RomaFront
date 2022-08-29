import { Component, OnInit } from "@angular/core";
import { VentasService } from "../../../../../comunes/servicios/ventas.service";
import { DatePipe } from "@angular/common";
import { ChartOptions, ChartType } from "chart.js";

@Component({
  selector: "app-rendimiento-diario-chart",
  templateUrl: "./rendimiento-diario-chart.component.html",
  styleUrls: ["./rendimiento-diario-chart.component.scss"],
})
export class RendimientoDiarioChartComponent implements OnInit {
  public datasets: {}[] = [];
  public pieChartLabels: string[][] = [];
  public pieChartData: string[] = [];
  public pieChartLegend: boolean = true;
  public pieChartType: ChartType = "pie";
  public total = 0;
  public pieChartColors = [
    {
      backgroundColor: ["#7c8981", "#a8bbaf", "#fffff0", "#748a9e", "#424f5c"],
    },
  ];
  public options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: true,
  };

  private fecha;
  constructor(private SrvVentas: VentasService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.fecha = new Date();
    this.calcularChart();
  }

  setFecha(event) {
    this.fecha = event.target.value;
    this.calcularChart();
  }

  get fechaChart() {
    return this.fecha;
  }

  calcularChart() {
    this.total = 0;
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.SrvVentas.getVentasDiariasEmpleados(
      this.datePipe.transform(this.fecha, "yyyy-MM-dd")
    ).subscribe(
      (resp) => {
        let cast: any = resp;
        console.log(cast);
        this.pieChartData = cast.map((venta) => venta.total_vendido);
        this.datasets.push({ data: this.pieChartData });
        this.pieChartLabels = cast.map((venta) => venta.nombre);
        this.pieChartData.forEach((monto) => {
          this.total = this.total + parseFloat(monto);
        });
        console.log(this.pieChartData);
      },
      (error) => {
        console.error(
          `Ocurrio un error al obtener los datos para el gráfico: ${error}`
        );
      }
    );
  }
}
