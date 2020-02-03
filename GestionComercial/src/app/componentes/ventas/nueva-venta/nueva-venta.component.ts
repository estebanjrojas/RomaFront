import { Component, OnInit, EventEmitter, ViewChild, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clientes } from 'src/app/modelos/Clientes';
import { Personas } from 'src/app/modelos/Personas';
import { Domicilios } from 'src/app/modelos/Domicilios';
import { SeleccionClientesComponent } from '../../adm-clientes/seleccion-clientes/seleccion-clientes.component';
import { VentasDetalle } from 'src/app/modelos/VentasDetalle';
import { CargaDetalleVentaComponent } from '../carga-detalle-venta/carga-detalle-venta.component';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit {
  @ViewChild(SeleccionClientesComponent, { static: true }) selectorClientes: SeleccionClientesComponent;
  @ViewChild(CargaDetalleVentaComponent, { static: false }) detalleVenta: CargaDetalleVentaComponent;
  nuevaVentaForm: FormGroup;
  clienteSeleccionado: Clientes;
  personaSeleccionada: Personas;
  domicilioPersonaSeleccionada: Domicilios;
  @Input() listaDetalleVentas: VentasDetalle[];
  
  constructor(private formBuilder: FormBuilder) {

    this.nuevaVentaForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],

      productosBuscar: []
    });

  }
  
  actualizarClienteSeleccionado(event){
    this.clienteSeleccionado=this.selectorClientes.clienteSeleccionado;
  }

  actualizarDetalleVenta(event) {
    this.listaDetalleVentas=this.detalleVenta.listaDetalleVentas;
    console.log({"parent":this.listaDetalleVentas})
  }

  ngOnInit() {
  }

 
  seleccionarCliente(cliente) {
    console.log(cliente);
  }
}
