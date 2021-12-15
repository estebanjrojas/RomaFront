import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material";
import { CargarProductosComponent } from "src/app/aplicaciones/panel/flujos-trabajo/productos/adm-productos/cargar-productos/cargar-productos.component";
import { BuscarProductosComponent } from "src/app/aplicaciones/panel/flujos-trabajo/productos/adm-productos/buscar-productos/buscar-productos.component";
import { DetalleProductoComponent } from "src/app/aplicaciones/panel/flujos-trabajo/productos/adm-productos/detalle-producto/detalle-producto.component";
import { PreciosProductosComponent } from "src/app/aplicaciones/panel/flujos-trabajo/productos/adm-productos/precios-productos/precios-productos.component";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { UiModule } from "src/app/core/ui/ui.module";
const appRoutes: Routes = [
  { path: "cargar-productos", component: CargarProductosComponent },
  {
    path: "cargar-productos/:productos_id",
    component: CargarProductosComponent,
  },
  {
    path: "busqueda-productos",
    component: BuscarProductosComponent,
  },

  { path: "clientes/detalle-producto", component: DetalleProductoComponent },
];

@NgModule({
  declarations: [
    CargarProductosComponent,
    BuscarProductosComponent,
    DetalleProductoComponent,
    PreciosProductosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SnackbarModule,
    UiModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class ProductosModule {}
