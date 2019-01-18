import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { CargarEmpleadosComponent } from './componentes/adm-empleados/cargar-empleados/cargar-empleados.component';
import { BusquedaEmpleadosComponent } from './componentes/adm-empleados/busqueda-empleados/busqueda-empleados.component';
import { BuscarPuntosDeVentaComponent } from './componentes/adm-puntos-de-venta/buscar-puntos-de-venta/buscar-puntos-de-venta.component';
import { CargarPuntosDeVentaComponent } from './componentes/adm-puntos-de-venta/cargar-puntos-de-venta/cargar-puntos-de-venta.component';
import { BuscarUsuariosComponent } from './componentes/adm-usuarios/buscar-usuarios/buscar-usuarios.component';
import { CargarUsuariosComponent } from './componentes/adm-usuarios/cargar-usuarios/cargar-usuarios.component';
import { AdministrarPerfilesComponent } from './componentes/adm-usuarios/administrar-perfiles/administrar-perfiles.component';
import { BuscarProductosComponent } from './componentes/adm-productos/buscar-productos/buscar-productos.component';
import { CargarProductosComponent } from './componentes/adm-productos/cargar-productos/cargar-productos.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { 
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule, 
   } from '@angular/material';


//Rutas para el Router de Angular
const appRoutes: Routes = [{ path: '', component: LoginComponent }
  , { path: 'login', component: LoginComponent }
  , { path: 'empleados/cargar-empleados', component: CargarEmpleadosComponent }
  , { path: 'empleados/busqueda-empleados', component: BusquedaEmpleadosComponent }
  , { path: 'productos/cargar-productos', component: CargarProductosComponent }
  , { path: 'productos/busqueda-productos', component: BuscarProductosComponent }
  , { path: 'puntos-venta/cargar-puntos-venta', component: CargarPuntosDeVentaComponent }
  , { path: 'puntos-venta/busqueda-puntos-venta', component: BuscarPuntosDeVentaComponent }
  , { path: 'usuarios/cargar-usuarios', component: CargarUsuariosComponent }
  , { path: 'usuarios/busqueda-usuarios', component: BuscarUsuariosComponent }
  , { path: 'usuarios/administrar-perfiles', component: AdministrarPerfilesComponent }

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
    CargarProductosComponent
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
