import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanelContainer } from "./panel.container";
import { UsuariosModule } from "./flujos-trabajo/administracion/adm-usuarios/usuarios.module";
import { VentasModule } from "./flujos-trabajo/ventas/ventas.module";
import { CategoriasModule } from "./flujos-trabajo/administracion/adm-categoria/categorias.module";
import { ProductosModule } from "./flujos-trabajo/productos/productos.module";
import { HomeComponent } from "./flujos-trabajo/home/home.component";
import { ClientesModule } from "./flujos-trabajo/administracion/adm-clientes/clientes.module";
import { EmpleadosModule } from "./flujos-trabajo/administracion/adm-empleados/empleados.module";
import { PuntosDeVentaModule } from "./flujos-trabajo/administracion/adm-puntos-de-venta/puntos-de-venta.module";
import { EstadisticasModule } from "./flujos-trabajo/estadisticas/estadisticas.module";
import { AutenticadoGuard } from "src/app/comunes/guardas/autenticado.guard";
const routes: Routes = [
  {
    path: "",
    component: PanelContainer,

    children: [
      {
        path: "usuarios",
        loadChildren: () => UsuariosModule,
        canActivate: [AutenticadoGuard],
      },
      {
        path: "clientes",
        loadChildren: () => ClientesModule,
        canActivate: [AutenticadoGuard],
      },
      {
        path: "empleados",
        loadChildren: () => EmpleadosModule,
        canActivate: [AutenticadoGuard],
      },
      {
        path: "puntos-venta",
        loadChildren: () => PuntosDeVentaModule,
        canActivate: [AutenticadoGuard],
      },
      {
        path: "ventas",
        loadChildren: () => VentasModule,
        canActivate: [AutenticadoGuard],
      },
      {
        path: "categorias",
        loadChildren: () => CategoriasModule,
        canActivate: [AutenticadoGuard],
      },
      {
        path: "productos",
        loadChildren: () => ProductosModule,
        canActivate: [AutenticadoGuard],
      },
      {
        path: "estadisticas",
        loadChildren: () => EstadisticasModule,
        canActivate: [AutenticadoGuard],
      },
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AutenticadoGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
