import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CargarPromocionesComponent } from "./adm-promociones/cargar-promociones/cargar-promociones.component";
import { BuscarPromocionesComponent } from "./adm-promociones/buscar-promociones/buscar-promociones.component";
import { BusquedaVentasComponent } from "src/app/aplicaciones/panel/flujos-trabajo/ventas/busqueda-ventas/busqueda-ventas.component";
import { NuevaVentaComponent } from "./nueva-venta/nueva-venta.component";
import { CargaDetalleVentaComponent } from "./carga-detalle-venta/carga-detalle-venta.component";
import { ConfirmacionVentaComponent } from "./confirmacion-venta/confirmacion-venta.component";
import { VisualizacionVentasComponent } from "./visualizacion-ventas/visualizacion-ventas.component";
import { SeleccionClientesComponent } from "../administracion/adm-clientes/seleccion-clientes/seleccion-clientes.component";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";

const appRoutes: Routes = [
  {
    path: "promociones/cargar-promociones",
    component: CargarPromocionesComponent,
  },
  {
    path: "promociones/busqueda-promociones",
    component: BuscarPromocionesComponent,
  },
  { path: "busqueda-ventas", component: BusquedaVentasComponent },
  { path: "nueva-venta", component: NuevaVentaComponent },
];

@NgModule({
  declarations: [
    CargarPromocionesComponent,
    BuscarPromocionesComponent,
    BusquedaVentasComponent,
    NuevaVentaComponent,
    CargaDetalleVentaComponent,
    ConfirmacionVentaComponent,
    VisualizacionVentasComponent,
    SeleccionClientesComponent,
  ],
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
export class VentasModule {}
