import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../servicios/clientes.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscar-clientes',
  templateUrl: './buscar-clientes.component.html',
  styleUrls: ['./buscar-clientes.component.css']
})
export class BuscarClientesComponent implements OnInit {

  cast: any;
  buscar: string = "";
  cantidad_paginas: number = 0;
  pagina_actual: number = 1;
  buscar_nombre: boolean = true;
  buscar_apellido: boolean = true;
  buscar_dni: boolean = true;
  buscar_fecha_nac: boolean = true;
  valor_boton_1: number = 1;
  valor_boton_2: number = 2;
  valor_boton_3: number = 3;


  constructor(
    private SrvClientes: ClientesService,
    private SrvToastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buscarClientes();
  }

  buscarClientes() {
    let buscar_por_nombre = 1;
    let buscar_por_apellido = 1;
    let buscar_por_dni = 1;
    let buscar_por_fecha_nac = 1;
    if (this.buscar_nombre) { buscar_por_nombre = 1; } else { buscar_por_nombre = 0; }
    if (this.buscar_apellido) { buscar_por_apellido = 1; } else { buscar_por_apellido = 0; }
    if (this.buscar_dni) { buscar_por_dni = 1; } else { buscar_por_dni = 0; }
    if (this.buscar_fecha_nac) { buscar_por_fecha_nac = 1; } else { buscar_por_fecha_nac = 0; }
    this.SrvClientes.getCantidadPaginasClientes(buscar_por_nombre, buscar_por_apellido, buscar_por_dni, buscar_por_fecha_nac, this.buscar).subscribe(respuesta => {
      let cast: any = respuesta.regCantidadPaginas.cantidad_paginas;
      this.cantidad_paginas = cast;
      this.pagina_actual = 1;
      this.setCantidadPaginas();
    }, error => {
      console.log(JSON.stringify(error));
    });
  }

  /** trae el detalle en base a la posicion y busqueda */
  getItems() {
    let buscar_por_nombre = 1;
    let buscar_por_apellido = 1;
    let buscar_por_dni = 1;
    let buscar_por_fecha_nac = 1;
    if (this.buscar_nombre) { buscar_por_nombre = 1; } else { buscar_por_nombre = 0; }
    if (this.buscar_apellido) { buscar_por_apellido = 1; } else { buscar_por_apellido = 0; }
    if (this.buscar_dni) { buscar_por_dni = 1; } else { buscar_por_dni = 0; }
    if (this.buscar_fecha_nac) { buscar_por_fecha_nac = 1; } else { buscar_por_fecha_nac = 0; }
    this.SrvClientes.getClientes(this.pagina_actual, this.cantidad_paginas, buscar_por_nombre, buscar_por_apellido, buscar_por_dni, buscar_por_fecha_nac, this.buscar).subscribe(respuesta => {
      this.cast = respuesta;
    }, error => {
      console.log(JSON.stringify(error));
    });
  }
  /** posiciona el indice en el boton seleccionado */
  setPaginaByComponenteId(valor) {
    this.pagina_actual = valor;
    this.setCantidadPaginas();
  }
  /** habilita la cantidad de botones indices en base a la cant de paginas */
  setCantidadPaginas() {
    if (this.pagina_actual <= 0) {
      this.pagina_actual = 1;
    } if (this.pagina_actual >= this.cantidad_paginas) {
      this.pagina_actual = this.cantidad_paginas;
    }
    this.paginarEn(this.pagina_actual);
    this.getItems();
  }
  /** enumera los botones en base a la pagina actual */
  paginarEn(paginarEnNumero) {
    if (paginarEnNumero <= 2) {
      paginarEnNumero = 2;
    } else {
      if (paginarEnNumero == this.cantidad_paginas) {
        paginarEnNumero = (this.cantidad_paginas - 1);
      }
    }
    this.valor_boton_1 = paginarEnNumero - 1;
    this.valor_boton_2 = paginarEnNumero;
    this.valor_boton_3 = paginarEnNumero + 1;
  }

}