import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { VentasService } from "../../../../../comunes/servicios/ventas.service";
import { DatePipe } from "@angular/common";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, BaseChartDirective, Label, SingleDataSet } from "ng2-charts";

@Component({
  selector: "app-chart-ventas-diarias",
  templateUrl: "./chart-ventas-diarias.component.html",
  styleUrls: ["./chart-ventas-diarias.component.scss"],
})
export class ChartVentasDiariasComponent implements OnInit {
  public arrayMontos: number[] = [];
  public arrayCantidades: number[] = [];
  public arrayFechas: string[] = [];
  public lineChartType: ChartType = "line";
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
        },
        {
          id: "y-axis-1",
          position: "right",
          gridLines: {
            color: "rgba(255,0,0,0.3)",
          },
          ticks: {
            fontColor: "red",
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
    {
      // red
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "red",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];

  chartVentasDiariasForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private SrvVentas: VentasService,
    private DatePipe: DatePipe
  ) {
    this.chartVentasDiariasForm = this.formBuilder.group({
      fecha_desde: [],
      fecha_hasta: [],
    });
  }

  ngOnInit() {}

  calcularChart() {
    const fecha_desde = this.DatePipe.transform(
      this.chartVentasDiariasForm.get("fecha_desde").value,
      "yyyy-MM-dd"
    );
    const fecha_hasta = this.DatePipe.transform(
      this.chartVentasDiariasForm.get("fecha_hasta").value,
      "yyyy-MM-dd"
    );

    this.SrvVentas.getEstadisticasVentasDiarias(
      fecha_desde,
      fecha_hasta
    ).subscribe((resp) => {
      //Filtro la respuesta para dejar solo los dias hábiles. Considero jornada de lunes a viernes
      const arrayFiltroDiasHabiles = resp.filter((info) => {
        return info._dia != "Sat" && info._dia != "Sun";
      });
      //Armo los arrays necesarios para el gráfico
      this.arrayMontos = arrayFiltroDiasHabiles.map(
        (montos) => montos._monto_total_vendido
      );
      this.arrayCantidades = arrayFiltroDiasHabiles.map(
        (cantidades) => cantidades._cantidad_articulos_vendidos
      );
      this.arrayFechas = arrayFiltroDiasHabiles.map((fechas) => {
        return this.DatePipe.transform(fechas._fecha, "dd/MM/yy");
      });
      this.lineChartData = [
        { data: this.arrayMontos, label: "Monto Diario de Ventas" },
        {
          data: this.arrayCantidades,
          label: "Cantidad de Articulos Vendidos",
          yAxisID: "y-axis-1",
        },
      ];
      this.lineChartLabels = this.arrayFechas;
      console.log(this.arrayCantidades);
    });
  }
}
