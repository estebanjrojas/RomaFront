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
import { CargarPromocionesComponent } from 'src/app/componentes/adm-promociones/cargar-promociones/cargar-promociones.component';
import { BuscarPromocionesComponent } from 'src/app/componentes/adm-promociones/buscar-promociones/buscar-promociones.component';
import { BusquedaVentasComponent } from 'src/app/componentes/ventas/busqueda-ventas/busqueda-ventas.component';
import { NuevaVentaComponent } from 'src/app/componentes/ventas/nueva-venta/nueva-venta.component';
import { CargaDetalleVentaComponent } from 'src/app/componentes/ventas/carga-detalle-venta/carga-detalle-venta.component';
import { ConfirmacionVentaComponent } from 'src/app/componentes/ventas/confirmacion-venta/confirmacion-venta.component';
import { VisualizacionVentasComponent } from 'src/app/componentes/ventas/visualizacion-ventas/visualizacion-ventas.component';
import { SeleccionClientesComponent } from 'src/app/componentes/adm-clientes/seleccion-clientes/seleccion-clientes.component';

const appRoutes: Routes = [{ path: 'promociones/cargar-promociones', component: CargarPromocionesComponent }
  , { path: 'promociones/busqueda-promociones', component: BuscarPromocionesComponent }
  , { path: 'ventas/busqueda-ventas', component: BusquedaVentasComponent }
  , { path: 'ventas/nueva-venta', component: NuevaVentaComponent }
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
    SeleccionClientesComponent
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
    
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class VentasModule { }
