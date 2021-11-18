import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule,
  MatAutocompleteModule, MatOptionModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatSelectModule,
  MatTreeModule, MatIconModule, MatRadioModule, MatCardModule,
  MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

import { BusquedaEmpleadosComponent } from '../../componentes/adm-empleados/busqueda-empleados/busqueda-empleados.component';
import { CargarEmpleadosComponent } from '../../componentes/adm-empleados/cargar-empleados/cargar-empleados.component';
import { CargarPuntosDeVentaComponent } from '../../componentes/adm-puntos-de-venta/cargar-puntos-de-venta/cargar-puntos-de-venta.component';
import { BuscarPuntosDeVentaComponent } from '../../componentes/adm-puntos-de-venta/buscar-puntos-de-venta/buscar-puntos-de-venta.component';
import { CargarUsuariosComponent } from '../../componentes/adm-usuarios/cargar-usuarios/cargar-usuarios.component';
import { BuscarUsuariosComponent } from '../../componentes/adm-usuarios/buscar-usuarios/buscar-usuarios.component';
import { AdministrarPerfilesComponent } from '../../componentes/adm-usuarios/administrar-perfiles/administrar-perfiles.component';
import { BuscarClientesComponent } from '../../componentes/adm-clientes/buscar-clientes/buscar-clientes.component';
import { CargarClientesComponent, MomentUtcDateAdapter } from '../../componentes/adm-clientes/cargar-clientes/cargar-clientes.component';
import { CambiarPasswordComponent } from '../../componentes/adm-usuarios/cambiar-password/cambiar-password.component';
import { EstadisticasHomeComponent } from '../../componentes/estadisticas/estadisticas-home/estadisticas-home.component';
import { PrediccionesHomeComponent } from '../../componentes/estadisticas/predicciones-home/predicciones-home.component';
import { ChartVentasDiariasComponent } from '../../componentes/estadisticas/chart-ventas-diarias/chart-ventas-diarias.component';
import { ChartVentasMensualesComponent } from '../../componentes/estadisticas/chart-ventas-mensuales/chart-ventas-mensuales.component';
import { ChartRendimientoVendedoresComponent } from '../../componentes/estadisticas/chart-rendimiento-vendedores/chart-rendimiento-vendedores.component';

const appRoutes: Routes = [{ path: 'empleados/busqueda-empleados', component: BusquedaEmpleadosComponent }
, { path: 'empleados/cargar-empleados', component: CargarEmpleadosComponent }
, { path: 'empleados/cargar-empleados/:empleados_id', component: CargarEmpleadosComponent }
, { path: 'puntos-venta/cargar-puntos-venta', component: CargarPuntosDeVentaComponent }
, { path: 'puntos-venta/cargar-puntos-venta/:puntos_venta_id', component: CargarPuntosDeVentaComponent }
, { path: 'puntos-venta/busqueda-puntos-venta', component: BuscarPuntosDeVentaComponent }
, { path: 'usuarios/cargar-usuarios', component: CargarUsuariosComponent }
, { path: 'usuarios/cargar-usuarios/:usuarios_id', component: CargarUsuariosComponent }
, { path: 'usuarios/busqueda-usuarios', component: BuscarUsuariosComponent }
, { path: 'usuarios/administrar-perfiles', component: AdministrarPerfilesComponent }
, { path: 'usuarios/administrar-perfiles/:empleados_id', component: AdministrarPerfilesComponent }
, { path: 'clientes/cargar-clientes', component: CargarClientesComponent }
, { path: 'clientes/cargar-clientes/:clientes_id', component: CargarClientesComponent }
, { path: 'clientes/busqueda-clientes', component: BuscarClientesComponent }
, { path: 'usuarios/cambiar-password', component: CambiarPasswordComponent }
, { path: 'estadisticas/estadisticas-home', component: EstadisticasHomeComponent }
, { path: 'estadisticas/predicciones-home', component: PrediccionesHomeComponent }]

@NgModule({
  declarations: [
    BusquedaEmpleadosComponent,
    CargarEmpleadosComponent,
    CargarPuntosDeVentaComponent,
    BuscarPuntosDeVentaComponent,
    CargarUsuariosComponent,
    BuscarUsuariosComponent,
    AdministrarPerfilesComponent,
    BuscarClientesComponent,
    CargarClientesComponent,
    CambiarPasswordComponent,
    EstadisticasHomeComponent,
    PrediccionesHomeComponent,
    ChartVentasDiariasComponent,
    ChartVentasMensualesComponent,
    ChartRendimientoVendedoresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
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
    MatTreeModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    FontAwesomeModule,
    ChartsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class AdministracionModule { }
