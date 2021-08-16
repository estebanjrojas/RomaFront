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
import {APP_BASE_HREF} from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { NavegacionSubmenuComponent } from './componentes/interfaz/navegacion-submenu/navegacion-submenu.component';
import { HomeComponent } from './componentes/home/home.component';
import { AdministracionModule } from './modulos/administracion/administracion.module';
import { ProductosModule } from './modulos/productos/productos.module';
import { VentasModule } from './modulos/ventas/ventas.module';

//Rutas para el Router de Angular
const appRoutes: Routes = [{ path: '', component: LoginComponent }
  , { path: 'login', component: LoginComponent }
  , { path: 'home', component: HomeComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieComponent,
    NavegacionComponent,
    LoginComponent,
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
    }),
    AdministracionModule,
    ProductosModule,
    VentasModule
  ], 
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: ''},
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

