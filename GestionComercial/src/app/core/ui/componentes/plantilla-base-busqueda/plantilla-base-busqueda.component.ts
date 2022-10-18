import { Component, Input } from "@angular/core";
import { BotonDinamico } from "../../comunes/interfaces/BotonDinamico";
@Component({
  selector: "app-plantilla-base-busqueda",
  templateUrl: "./plantilla-base-busqueda.component.html",
  styleUrls: ["./plantilla-base-busqueda.component.scss"],
})
export class PlantillaBaseBusquedaComponent {
  @Input() titulo: string;
  @Input() botonPrincipal: BotonDinamico;
  constructor() {}

  ejecutarAccionBotonPrincipal() {
    if (this.botonPrincipal.accion) {
      this.botonPrincipal.accion();
    }
  }
}
