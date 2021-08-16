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
import { CargarProductosComponent } from 'src/app/componentes/adm-productos/cargar-productos/cargar-productos.component';
import { BuscarProductosComponent } from 'src/app/componentes/adm-productos/buscar-productos/buscar-productos.component';
import { CargarCategoriaComponent } from 'src/app/componentes/adm-categoria/cargar-categoria/cargar-categoria.component';
import { BuscarCategoriaComponent } from 'src/app/componentes/adm-categoria/buscar-categoria/buscar-categoria.component';
import { DetalleProductoComponent } from 'src/app/componentes/adm-productos/detalle-producto/detalle-producto.component';
import { PreciosProductosComponent } from 'src/app/componentes/adm-productos/precios-productos/precios-productos.component';

const appRoutes: Routes = [{ path: 'productos/cargar-productos', component: CargarProductosComponent }
  , { path: 'productos/cargar-productos/:productos_id', component: CargarProductosComponent }
  , { path: 'productos/busqueda-productos', component: BuscarProductosComponent }
  , { path: 'categorias/cargar-categorias', component: CargarCategoriaComponent }
  , { path: 'categorias/cargar-categorias/:categorias_id', component: CargarCategoriaComponent }
  , { path: 'categorias/busqueda-categorias', component: BuscarCategoriaComponent }
  , { path: 'clientes/detalle-producto', component: DetalleProductoComponent }
  
];

@NgModule({
  declarations: [
    CargarProductosComponent,
    BuscarProductosComponent,
    CargarCategoriaComponent,
    BuscarCategoriaComponent,
    DetalleProductoComponent,
    PreciosProductosComponent,
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
export class ProductosModule { }
