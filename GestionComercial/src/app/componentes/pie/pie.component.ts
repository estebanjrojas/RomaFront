import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  anio_actual: number = new Date().getFullYear();
  constructor() { }

  ngOnInit() {
  }

}
