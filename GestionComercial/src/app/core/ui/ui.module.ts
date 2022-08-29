import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { TreeComponent } from "./componentes/tree/tree.component";
import { SnackBarService } from "./comunes/servicios/SnackBarService";
import { TreeBranchComponent } from "./componentes/tree-branch/tree-branch.component";
import { PieComponent } from "./componentes/pie/pie.component";
import { NavegacionComponent } from "./componentes/navegacion/navegacion.component";
import { NavegacionSubmenuComponent } from "./componentes/navegacion-submenu/navegacion-submenu.component";
import { CabeceraComponent } from "./componentes/cabecera/cabecera.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    TreeComponent,
    TreeBranchComponent,
    PieComponent,
    NavegacionComponent,
    NavegacionSubmenuComponent,
    CabeceraComponent,
  ],
  exports: [
    TreeComponent,
    TreeBranchComponent,
    PieComponent,
    NavegacionComponent,
    NavegacionSubmenuComponent,
    CabeceraComponent,
  ],
  imports: [CommonModule, RouterModule, SnackbarModule],
  providers: [SnackBarService],
  schemas: [],
})
export class UiModule {}
