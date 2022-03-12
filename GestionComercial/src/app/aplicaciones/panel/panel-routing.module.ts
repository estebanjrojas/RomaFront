import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanelContainer } from "./panel.container";
import { HomeComponent } from "./flujos-trabajo/home/home.component";
import { AutenticadoGuard } from "src/app/comunes/guardas/autenticado.guard";
const routes: Routes = [
  {
    path: "",
    component: PanelContainer,

    children: [
      {
        path: "usuarios",
        loadChildren: () =>
          import(
            "./flujos-trabajo/administracion/adm-usuarios/usuarios.module"
          ).then((m) => m.UsuariosModule),
        canActivate: [AutenticadoGuard],
      },
      {
        path: "clientes",
        loadChildren: () =>
          import(
            "./flujos-trabajo/administracion/adm-clientes/clientes.module"
          ).then((m) => m.ClientesModule),
        canActivate: [AutenticadoGuard],
      },
      {
        path: "empleados",
        loadChildren: () =>
          import(
            "./flujos-trabajo/administracion/adm-empleados/empleados.module"
          ).then((m) => m.EmpleadosModule),
        canActivate: [AutenticadoGuard],
      },
      {
        path: "puntos-venta",
        loadChildren: () =>
          import(
            "./flujos-trabajo/administracion/adm-puntos-de-venta/puntos-de-venta.module"
          ).then((m) => m.PuntosDeVentaModule),
        canActivate: [AutenticadoGuard],
      },
      {
        path: "ventas",
        loadChildren: () =>
          import("./flujos-trabajo/ventas/ventas.module").then(
            (m) => m.VentasModule
          ),
        canActivate: [AutenticadoGuard],
      },
      {
        path: "categorias",
        loadChildren: () =>
          import(
            "./flujos-trabajo/administracion/adm-categoria/categorias.module"
          ).then((m) => m.CategoriasModule),
        canActivate: [AutenticadoGuard],
      },
      {
        path: "productos",
        loadChildren: () =>
          import("./flujos-trabajo/productos/productos.module").then(
            (m) => m.ProductosModule
          ),
        canActivate: [AutenticadoGuard],
      },
      {
        path: "estadisticas",
        loadChildren: () =>
          import("./flujos-trabajo/estadisticas/estadisticas.module").then(
            (m) => m.EstadisticasModule
          ),
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
