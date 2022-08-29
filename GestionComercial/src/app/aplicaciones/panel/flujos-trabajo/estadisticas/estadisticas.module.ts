import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/core/ui/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RendimientoDiarioChartComponent } from "./rendimiento-diario-chart/rendimiento-diario-chart.component";
import { EstadisticasHomeComponent } from "./estadisticas-home/estadisticas-home.component";
import { PrediccionesHomeComponent } from "./predicciones-home/predicciones-home.component";
import { ChartVentasDiariasComponent } from "./chart-ventas-diarias/chart-ventas-diarias.component";
import { ChartVentasMensualesComponent } from "./chart-ventas-mensuales/chart-ventas-mensuales.component";
import { ChartRendimientoVendedoresComponent } from "./chart-rendimiento-vendedores/chart-rendimiento-vendedores.component";
import { UiModule } from "src/app/core/ui/ui.module";
import { AutenticadoGuard } from "src/app/comunes/guardas/autenticado.guard";
import { PerfilGuard } from "src/app/comunes/guardas/perfil.guard";
const appRoutes: Routes = [
  {
    path: "estadisticas-home",
    component: EstadisticasHomeComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "predicciones-home",
    component: PrediccionesHomeComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
];

@NgModule({
  declarations: [
    RendimientoDiarioChartComponent,
    EstadisticasHomeComponent,
    PrediccionesHomeComponent,
    ChartVentasDiariasComponent,
    ChartVentasMensualesComponent,
    ChartRendimientoVendedoresComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FontAwesomeModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    RouterModule.forChild(appRoutes),
  ],
  exports: [RendimientoDiarioChartComponent],
})
export class EstadisticasModule {}
