import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-visualizacion-ventas',
  templateUrl: './visualizacion-ventas.component.html',
  styleUrls: ['./visualizacion-ventas.component.css']
})
export class VisualizacionVentasComponent implements OnInit {

  constructor() { }

  @Input() ventas_id : number;

  ngOnInit() {
  }

}
