import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-pie",
  templateUrl: "./pie.component.html",
  styleUrls: ["./pie.component.scss"],
})
export class PieComponent implements OnInit {
  anio_actual: number = new Date().getFullYear();
  constructor(private router: Router) {}

  ngOnInit() {}

  get routerUrl() {
    return this.router.url;
  }
}
