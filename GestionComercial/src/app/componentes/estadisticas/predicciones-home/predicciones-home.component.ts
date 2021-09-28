import { Component, OnInit } from '@angular/core';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-predicciones-home',
  templateUrl: './predicciones-home.component.html',
  styleUrls: ['./predicciones-home.component.css']
})
export class PrediccionesHomeComponent implements OnInit {

  constructor() { }
  faProjectDiagram = faProjectDiagram;

  ngOnInit() {
  }

}
