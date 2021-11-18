import { Component, OnInit } from '@angular/core';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-estadisticas-home',
  templateUrl: './estadisticas-home.component.html',
  styleUrls: ['./estadisticas-home.component.css']
})
export class EstadisticasHomeComponent implements OnInit {

  constructor() { }
  faChartArea = faChartArea;
  tipoGraficoElegido :string;
  ngOnInit() {
  }

  setTipoGrafico(valor){
    this.tipoGraficoElegido = valor;
   }

}
