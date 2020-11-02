import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule,
  MatAutocompleteModule, MatOptionModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatSelectModule,
  MatTreeModule, MatIconModule, MatRadioModule, MatCardModule,
  MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/interfaz/cabecera/cabecera.component';
import { PieComponent } from './componentes/interfaz/pie/pie.component';
import { NavegacionComponent } from './componentes/interfaz/navegacion/navegacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { CargarEmpleadosComponent } from './componentes/adm-empleados/cargar-empleados/cargar-empleados.component';
import { BusquedaEmpleadosComponent } from './componentes/adm-empleados/busqueda-empleados/busqueda-empleados.component';
import { CargarPuntosDeVentaComponent } from './componentes/adm-puntos-de-venta/cargar-puntos-de-venta/cargar-puntos-de-venta.component';
import { BuscarPuntosDeVentaComponent } from './componentes/adm-puntos-de-venta/buscar-puntos-de-venta/buscar-puntos-de-venta.component';
import { CargarUsuariosComponent } from './componentes/adm-usuarios/cargar-usuarios/cargar-usuarios.component';
import { BuscarUsuariosComponent } from './componentes/adm-usuarios/buscar-usuarios/buscar-usuarios.component';
import { CargarProductosComponent } from './componentes/adm-productos/cargar-productos/cargar-productos.component';
import { BuscarProductosComponent } from './componentes/adm-productos/buscar-productos/buscar-productos.component';
import { AdministrarPerfilesComponent } from './componentes/adm-usuarios/administrar-perfiles/administrar-perfiles.component';
import { CargarCategoriaComponent } from './componentes/adm-categoria/cargar-categoria/cargar-categoria.component';
import { BuscarCategoriaComponent } from './componentes/adm-categoria/buscar-categoria/buscar-categoria.component';
import { CargarPromocionesComponent } from './componentes/adm-promociones/cargar-promociones/cargar-promociones.component';
import { BuscarPromocionesComponent } from './componentes/adm-promociones/buscar-promociones/buscar-promociones.component';
import { BuscarClientesComponent } from './componentes/adm-clientes/buscar-clientes/buscar-clientes.component';
import { CargarClientesComponent, MomentUtcDateAdapter } from './componentes/adm-clientes/cargar-clientes/cargar-clientes.component';
import { DetalleProductoComponent } from './componentes/adm-productos/detalle-producto/detalle-producto.component';
import { BusquedaVentasComponent } from './componentes/ventas/busqueda-ventas/busqueda-ventas.component';
import { NuevaVentaComponent } from './componentes/ventas/nueva-venta/nueva-venta.component';
import { SeleccionClientesComponent } from './componentes/adm-clientes/seleccion-clientes/seleccion-clientes.component';
import { CargaDetalleVentaComponent } from './componentes/ventas/carga-detalle-venta/carga-detalle-venta.component';
import { ConfirmacionVentaComponent } from './componentes/ventas/confirmacion-venta/confirmacion-venta.component';
import { PreciosProductosComponent } from './componentes/adm-productos/precios-productos/precios-productos.component';
import { CambiarPasswordComponent } from './componentes/adm-usuarios/cambiar-password/cambiar-password.component';
import {APP_BASE_HREF} from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { VisualizacionVentasComponent } from './componentes/ventas/visualizacion-ventas/visualizacion-ventas.component';
import { NavegacionSubmenuComponent } from './componentes/interfaz/navegacion-submenu/navegacion-submenu.component';
import { HomeComponent } from './componentes/home/home.component';

//Rutas para el Router de Angular
const appRoutes: Routes = [{ path: '', component: LoginComponent }
  , { path: 'login', component: LoginComponent }
  , { path: 'home', component: HomeComponent }
  , { path: 'empleados/cargar-empleados', component: CargarEmpleadosComponent }
  , { path: 'empleados/cargar-empleados/:empleados_id', component: CargarEmpleadosComponent }
  , { path: 'empleados/busqueda-empleados', component: BusquedaEmpleadosComponent }
  , { path: 'productos/cargar-productos', component: CargarProductosComponent }
  , { path: 'productos/cargar-productos/:productos_id', component: CargarProductosComponent }
  , { path: 'productos/busqueda-productos', component: BuscarProductosComponent }
  , { path: 'puntos-venta/cargar-puntos-venta', component: CargarPuntosDeVentaComponent }
  , { path: 'puntos-venta/cargar-puntos-venta/:puntos_venta_id', component: CargarPuntosDeVentaComponent }
  , { path: 'puntos-venta/busqueda-puntos-venta', component: BuscarPuntosDeVentaComponent }
  , { path: 'usuarios/cargar-usuarios', component: CargarUsuariosComponent }
  , { path: 'usuarios/cargar-usuarios/:usuarios_id', component: CargarUsuariosComponent }
  , { path: 'usuarios/busqueda-usuarios', component: BuscarUsuariosComponent }
  , { path: 'usuarios/administrar-perfiles', component: AdministrarPerfilesComponent }
  , { path: 'usuarios/administrar-perfiles/:empleados_id', component: AdministrarPerfilesComponent }
  , { path: 'usuarios/cambiar-password', component: CambiarPasswordComponent }
  , { path: 'categorias/cargar-categorias', component: CargarCategoriaComponent }
  , { path: 'categorias/cargar-categorias/:categorias_id', component: CargarCategoriaComponent }
  , { path: 'categorias/busqueda-categorias', component: BuscarCategoriaComponent }
  , { path: 'promociones/cargar-promociones', component: CargarPromocionesComponent }
  , { path: 'promociones/busqueda-promociones', component: BuscarPromocionesComponent }
  , { path: 'clientes/cargar-clientes', component: CargarClientesComponent }
  , { path: 'clientes/cargar-clientes/:clientes_id', component: CargarClientesComponent }
  , { path: 'clientes/busqueda-clientes', component: BuscarClientesComponent }
  , { path: 'clientes/detalle-producto', component: DetalleProductoComponent }
  , { path: 'ventas/busqueda-ventas', component: BusquedaVentasComponent }
  , { path: 'ventas/nueva-venta', component: NuevaVentaComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieComponent,
    NavegacionComponent,
    LoginComponent,
    CargarEmpleadosComponent,
    BusquedaEmpleadosComponent,
    BuscarPuntosDeVentaComponent,
    CargarPuntosDeVentaComponent,
    BuscarUsuariosComponent,
    CargarUsuariosComponent,
    AdministrarPerfilesComponent,
    BuscarProductosComponent,
    CargarProductosComponent,
    BuscarCategoriaComponent,
    CargarCategoriaComponent,
    BuscarPromocionesComponent,
    CargarPromocionesComponent,
    BuscarClientesComponent,
    CargarClientesComponent,
    DetalleProductoComponent,
    BusquedaVentasComponent,
    NuevaVentaComponent,
    SeleccionClientesComponent,
    CargaDetalleVentaComponent,
    ConfirmacionVentaComponent,
    PreciosProductosComponent,
    CambiarPasswordComponent,
    VisualizacionVentasComponent,
    NavegacionSubmenuComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTreeModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      newestOnTop: true
    })
  ], 
  providers: [{provide: APP_BASE_HREF, useValue: ''},
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

