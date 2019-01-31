import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule,
  MatAutocompleteModule, MatOptionModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatSelectModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CargarPromocionesComponent } from './componentes/adm-promociones/cargar-promociones/cargar-promociones.component';
import { BuscarPromocionesComponent } from './componentes/adm-promociones/buscar-promociones/buscar-promociones.component';


//Rutas para el Router de Angular
const appRoutes: Routes = [{ path: '', component: LoginComponent }
  , { path: 'login', component: LoginComponent }
  , { path: 'empleados/cargar-empleados', component: CargarEmpleadosComponent }
  , { path: 'empleados/cargar-empleados/:empleados_id', component: CargarEmpleadosComponent }
  , { path: 'empleados/busqueda-empleados', component: BusquedaEmpleadosComponent }
  , { path: 'productos/cargar-productos', component: CargarProductosComponent }
  , { path: 'productos/busqueda-productos', component: BuscarProductosComponent }
  , { path: 'puntos-venta/cargar-puntos-venta', component: CargarPuntosDeVentaComponent }
  , { path: 'puntos-venta/busqueda-puntos-venta', component: BuscarPuntosDeVentaComponent }
  , { path: 'usuarios/cargar-usuarios', component: CargarUsuariosComponent }
  , { path: 'usuarios/busqueda-usuarios', component: BuscarUsuariosComponent }
  , { path: 'usuarios/administrar-perfiles', component: AdministrarPerfilesComponent }
  , { path: 'categorias/cargar-categorias', component: CargarCategoriaComponent }
  , { path: 'categorias/busqueda-categorias', component: BuscarCategoriaComponent }
  , { path: 'promociones/cargar-promociones', component: CargarPromocionesComponent }
  , { path: 'promociones/busqueda-promociones', component: BuscarPromocionesComponent }

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
    CargarPromocionesComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      newestOnTop: true
    }),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
