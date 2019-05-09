import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VentasDetalle } from '../../../modelos/VentasDetalle';
import { Clientes } from '../../../modelos/Clientes';
import { VentasService } from '../../../servicios/ventas.service';
import { ClientesService } from '../../../servicios/clientes.service';


@Component({
  selector: 'app-confirmacion-venta',
  templateUrl: './confirmacion-venta.component.html',
  styleUrls: ['./confirmacion-venta.component.css']
})
export class ConfirmacionVentaComponent implements OnInit {
  confirmacionVentaForm: FormGroup;
  listaDetalleVentas: VentasDetalle[];
  clienteSeleccionado: Clientes;

  constructor(private formBuilder: FormBuilder
            , private SrvVentas: VentasService
            , private SrvClientes: ClientesService) {

              
    this.confirmacionVentaForm = this.formBuilder.group({
      
    });
  }

  ngOnInit() {
    this.listaDetalleVentas = this.SrvVentas.getDetalleVentaActual();
    
  }

  getClienteSeleccionado() {
    this.clienteSeleccionado = this.SrvClientes.getCliente();
    console.log({"SrvClientes.getCliente": this.clienteSeleccionado});
  }

}


