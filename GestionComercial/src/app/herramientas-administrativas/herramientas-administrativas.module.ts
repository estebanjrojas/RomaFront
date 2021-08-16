import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusquedaEmpleadosComponent } from '../componentes/adm-empleados/busqueda-empleados/busqueda-empleados.component';

const appRoutes: Routes = [{ path: 'empleados/busqueda-empleados', component: BusquedaEmpleadosComponent }]

@NgModule({
  declarations: [
    BusquedaEmpleadosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HerramientasAdministrativasModule { }
