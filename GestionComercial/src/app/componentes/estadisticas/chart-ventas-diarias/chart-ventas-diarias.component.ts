import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chart-ventas-diarias',
  templateUrl: './chart-ventas-diarias.component.html',
  styleUrls: ['./chart-ventas-diarias.component.css']
})
export class ChartVentasDiariasComponent implements OnInit {
  chartVentasDiariasForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.chartVentasDiariasForm = this.formBuilder.group({
      fecha_desde: [],
      fecha_hasta: []
    });
  }

  ngOnInit() {
  }

  calcularChart() {
    console.log(this.chartVentasDiariasForm.get('fecha_desde').value);
  }

}
