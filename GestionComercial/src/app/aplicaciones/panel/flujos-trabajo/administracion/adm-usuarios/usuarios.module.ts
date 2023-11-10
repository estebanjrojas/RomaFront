import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgChartsModule } from "ng2-charts";
import { CargarUsuariosComponent } from "./cargar-usuarios/cargar-usuarios.component";
import { BuscarUsuariosComponent } from "./buscar-usuarios/buscar-usuarios.component";
import { AdministrarPerfilesComponent } from "./administrar-perfiles/administrar-perfiles.component";
import { CambiarPasswordComponent } from "./cambiar-password/cambiar-password.component";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { UiModule } from "src/app/core/ui/ui.module";
import { AutenticadoGuard } from "src/app/comunes/guardas/autenticado.guard";
import { PerfilGuard } from "src/app/comunes/guardas/perfil.guard";
const appRoutes: Routes = [
  {
    path: "cargar-usuarios",
    component: CargarUsuariosComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "cargar-usuarios/:usuarios_id",
    component: CargarUsuariosComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "busqueda-usuarios",
    component: BuscarUsuariosComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "administrar-perfiles",
    component: AdministrarPerfilesComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "administrar-perfiles/:empleados_id/:usuario_id",
    component: AdministrarPerfilesComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "cambiar-password",
    component: CambiarPasswordComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
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
    NgChartsModule,
    MaterialModule,
    SnackbarModule,
    UiModule,
  ],
  providers: [],
})
export class UsuariosModule {}
