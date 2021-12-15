import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from "ng2-charts";
import { CargarPuntosDeVentaComponent } from "./cargar-puntos-de-venta/cargar-puntos-de-venta.component";
import { BuscarPuntosDeVentaComponent } from "./buscar-puntos-de-venta/buscar-puntos-de-venta.component";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { UiModule } from "src/app/core/ui/ui.module";

const appRoutes: Routes = [
  {
    path: "cargar-puntos-venta",
    component: CargarPuntosDeVentaComponent,
  },
  {
    path: "cargar-puntos-venta/:puntos_venta_id",
    component: CargarPuntosDeVentaComponent,
  },
  {
    path: "busqueda-puntos-venta",
    component: BuscarPuntosDeVentaComponent,
  },
];

@NgModule({
  declarations: [CargarPuntosDeVentaComponent, BuscarPuntosDeVentaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ChartsModule,
    MaterialModule,
    SnackbarModule,
    UiModule,
  ],
  providers: [],
})
export class PuntosDeVentaModule {}
