import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { VentasService } from "../../../../../comunes/servicios/ventas.service";
import { DatePipe } from "@angular/common";
import { SnackbarService } from "src/app/comunes/servicios/snackbar.service";

@Component({
  selector: "app-chart-ventas-mensuales",
  templateUrl: "./chart-ventas-mensuales.component.html",
  styleUrls: ["./chart-ventas-mensuales.component.scss"],
})
export class ChartVentasMensualesComponent implements OnInit {
  chartVentasMensualesForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private SrvVentas: VentasService,
    private srvSnackBar: SnackbarService,
    private DatePipe: DatePipe
  ) {
    this.chartVentasMensualesForm = this.formBuilder.group({
      anio_desde: [],
      mes_desde: [],
      anio_hasta: [],
      mes_hasta: [],
    });
  }

  ngOnInit() {}

  calcularChart() {
    //do something...
  }
}
