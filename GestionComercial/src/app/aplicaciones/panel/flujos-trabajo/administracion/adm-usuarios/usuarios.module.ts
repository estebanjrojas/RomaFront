import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from "ng2-charts";
import { CargarUsuariosComponent } from "./cargar-usuarios/cargar-usuarios.component";
import { BuscarUsuariosComponent } from "./buscar-usuarios/buscar-usuarios.component";
import { AdministrarPerfilesComponent } from "./administrar-perfiles/administrar-perfiles.component";
import { CambiarPasswordComponent } from "./cambiar-password/cambiar-password.component";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { UiModule } from "src/app/core/ui/ui.module";

const appRoutes: Routes = [
  { path: "cargar-usuarios", component: CargarUsuariosComponent },
  {
    path: "cargar-usuarios/:usuarios_id",
    component: CargarUsuariosComponent,
  },
  { path: "busqueda-usuarios", component: BuscarUsuariosComponent },
  {
    path: "administrar-perfiles",
    component: AdministrarPerfilesComponent,
  },
  {
    path: "administrar-perfiles/:empleados_id",
    component: AdministrarPerfilesComponent,
  },
  { path: "cambiar-password", component: CambiarPasswordComponent },
];

@NgModule({
  declarations: [
    CargarUsuariosComponent,
    BuscarUsuariosComponent,
    AdministrarPerfilesComponent,
    CambiarPasswordComponent,
  ],
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
export class UsuariosModule {}
