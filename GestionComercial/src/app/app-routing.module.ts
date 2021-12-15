import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginModule } from "src/app/aplicaciones/login/login.module";
import { PanelModule } from "src/app/aplicaciones/panel/panel.module";
import { UiModule } from "./core/ui/ui.module";
const routes: Routes = [
  {
    path: "",
    loadChildren: () => LoginModule,
  },
  {
    path: "panel",
    loadChildren: () => PanelModule,
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
