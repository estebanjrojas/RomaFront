import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VentasService } from '../../../servicios/ventas.service';
import { DatePipe } from '@angular/common';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-chart-ventas-mensuales',
  templateUrl: './chart-ventas-mensuales.component.html',
  styleUrls: ['./chart-ventas-mensuales.component.css']
})
export class ChartVentasMensualesComponent implements OnInit {
  chartVentasMensualesForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private SrvVentas: VentasService,
              private DatePipe: DatePipe) {

    this.chartVentasMensualesForm = this.formBuilder.group({
      anio_desde: [],
      mes_desde: [],
      anio_hasta: [],
      mes_hasta: []
    });

  }

  ngOnInit() {
  }

}
