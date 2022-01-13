import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { BuscarClientesComponent } from "./buscar-clientes/buscar-clientes.component";
import { CargarClientesComponent } from "./cargar-clientes/cargar-clientes.component";
import { AutenticadoGuard } from "src/app/comunes/guardas/autenticado.guard";

const appRoutes: Routes = [
  {
    path: "cargar-clientes",
    component: CargarClientesComponent,
    canActivate: [AutenticadoGuard],
  },
  {
    path: "cargar-clientes/:clientes_id",
    component: CargarClientesComponent,
    canActivate: [AutenticadoGuard],
  },
  {
    path: "busqueda-clientes",
    component: BuscarClientesComponent,
    canActivate: [AutenticadoGuard],
  },
];

@NgModule({
  declarations: [BuscarClientesComponent, CargarClientesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SnackbarModule,
  ],
  providers: [],
})
export class ClientesModule {}
