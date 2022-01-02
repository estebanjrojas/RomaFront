import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CargarCategoriaComponent } from "src/app/aplicaciones/panel/flujos-trabajo/administracion/adm-categoria/cargar-categoria/cargar-categoria.component";
import { BuscarCategoriaComponent } from "src/app/aplicaciones/panel/flujos-trabajo/administracion/adm-categoria/buscar-categoria/buscar-categoria.component";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { UiModule } from "src/app/core/ui/ui.module";
const appRoutes: Routes = [
  { path: "cargar-categorias", component: CargarCategoriaComponent },
  {
    path: "cargar-categorias/:categorias_id",
    component: CargarCategoriaComponent,
  },
  {
    path: "busqueda-categorias",
    component: BuscarCategoriaComponent,
  },
];

@NgModule({
  declarations: [CargarCategoriaComponent, BuscarCategoriaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SnackbarModule,
    UiModule,
  ],
  providers: [],
})
export class CategoriasModule {}
