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
const routes: Routes = [
  {
    path: "",
    component: PanelContainer,

    children: [
      {
        path: "usuarios",
        loadChildren: () => UsuariosModule,
      },
      {
        path: "clientes",
        loadChildren: () => ClientesModule,
      },
      {
        path: "empleados",
        loadChildren: () => EmpleadosModule,
      },
      {
        path: "puntos-venta",
        loadChildren: () => PuntosDeVentaModule,
      },
      {
        path: "ventas",
        loadChildren: () => VentasModule,
      },
      {
        path: "categorias",
        loadChildren: () => CategoriasModule,
      },
      {
        path: "productos",
        loadChildren: () => ProductosModule,
      },
      {
        path: "estadisticas",
        loadChildren: () => EstadisticasModule,
      },
      {
        path: "home",
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
