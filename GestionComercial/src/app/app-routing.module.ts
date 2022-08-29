import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UiModule } from "./core/ui/ui.module";
import { AutenticadoGuard } from "./comunes/guardas/autenticado.guard";
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("src/app/aplicaciones/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "panel",
    loadChildren: () =>
      import("src/app/aplicaciones/panel/panel.module").then(
        (m) => m.PanelModule
      ),
    canActivate: [AutenticadoGuard],
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [UiModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
