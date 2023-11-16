import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BusquedaVentasComponent } from "src/app/aplicaciones/panel/flujos-trabajo/ventas/busqueda-ventas/busqueda-ventas.component";
import { NuevaVentaComponent } from "./nueva-venta/nueva-venta.component";
import { CargaDetalleVentaComponent } from "./carga-detalle-venta/carga-detalle-venta.component";
import { ConfirmacionVentaComponent } from "./confirmacion-venta/confirmacion-venta.component";
import { VisualizacionVentasComponent } from "./visualizacion-ventas/visualizacion-ventas.component";
import { SeleccionClientesComponent } from "../administracion/adm-clientes/seleccion-clientes/seleccion-clientes.component";
import { MaterialModule } from "src/app/core/ui/material.module";
import { SnackbarModule } from "src/app/core/ui/snackbar.module";
import { AutenticadoGuard } from "src/app/comunes/guardas/autenticado.guard";
import { PerfilGuard } from "src/app/comunes/guardas/perfil.guard";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DetalleVentasDialogComponent } from "./detalle-ventas-dialog/detalle-ventas-dialog.component";
import { DetalleVentasDialogService } from "./detalle-ventas-dialog/detalle-ventas-dialog.service";

const appRoutes: Routes = [
  {
    path: "busqueda-ventas",
    component: BusquedaVentasComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
  {
    path: "nueva-venta",
    component: NuevaVentaComponent,
    canActivate: [AutenticadoGuard, PerfilGuard],
  },
];

@NgModule({
  declarations: [
    BusquedaVentasComponent,
    NuevaVentaComponent,
    CargaDetalleVentaComponent,
    ConfirmacionVentaComponent,
    VisualizacionVentasComponent,
    SeleccionClientesComponent,
    DetalleVentasDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SnackbarModule,
  ],
  providers: [DetalleVentasDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VentasModule {}
