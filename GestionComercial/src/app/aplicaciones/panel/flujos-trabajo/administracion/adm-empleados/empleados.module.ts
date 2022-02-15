import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from "ng2-charts";
import { BusquedaEmpleadosComponent } from "./busqueda-empleados/busqueda-empleados.component";
import { CargarEmpleadosComponent } from "./cargar-empleados/cargar-empleados.component";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { UiModule } from "src/app/core/ui/ui.module";
import { AutenticadoGuard } from "src/app/comunes/guardas/autenticado.guard";
import { PerfilGuard } from "src/app/comunes/guardas/perfil.guard";
const appRoutes: Routes = [
  {
    path: "busqueda-empleados",
    component: BusquedaEmpleadosComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "cargar-empleados",
    component: CargarEmpleadosComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "cargar-empleados/:empleados_id",
    component: CargarEmpleadosComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
];

@NgModule({
  declarations: [BusquedaEmpleadosComponent, CargarEmpleadosComponent],
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
export class EmpleadosModule {}
