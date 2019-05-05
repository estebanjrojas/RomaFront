import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../servicios/clientes.service';
import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../../modelos/Clientes';
import { Personas } from '../../../modelos/Personas';
@Component({
  selector: 'app-seleccion-clientes',
  templateUrl: './seleccion-clientes.component.html',
  styleUrls: ['./seleccion-clientes.component.css']
})
export class SeleccionClientesComponent implements OnInit {

  seleccionClientesForm: FormGroup;
  clientes: any;
  clienteSeleccionado: Clientes;
  personaSeleccionada: Personas;

  constructor(private SrvClientes: ClientesService, private formBuilder: FormBuilder) {

    this.seleccionClientesForm = this.formBuilder.group({
      txtBuscarCliente: [],
      cbTipoBusquedaCliente: []
    });
  }

  ngOnInit() {
  }


  buscarClientes() {
    const texto_busqueda = this.seleccionClientesForm.get('txtBuscarCliente').value;
    const campo_busqueda = this.seleccionClientesForm.get('cbTipoBusquedaCliente').value;

      this.SrvClientes.getClientesWhere(campo_busqueda, texto_busqueda).subscribe(respuesta => {
        this.clientes = respuesta;
        console.log({'SrvCategorias.getClientesWhere': this.clientes });
      });

  }

  seleccionarCliente(cliente: any) {

    this.personaSeleccionada = {
      'personas_id': cliente.personas_id,
      'tipo_doc': cliente.tipo_doc,
      'nro_doc': cliente.nro_doc,
      'apellido': cliente.apellido,
      'nombre': cliente.nombre,
      'telefono': cliente.telefono,
      'telefono_cel': cliente.telefono_cel,
      'email': cliente.email,
      'fecha_nac': cliente.fecha_nac,
      'tipo_persona': cliente.tipo_persona,
      'estado_civil': cliente.estado_civil,
      'fecha_cese': cliente.fecha_cese,
      'telefono_caracteristica': cliente.telefono_caracteristica,
      'celular_caracteristica': cliente.celular_caracteristica
    };

    this.clienteSeleccionado = {
      'clientes_id': cliente.id,
      'fecha_alta': cliente.fecha_alta,
      'persona': this.personaSeleccionada
    };
    this.clientes = [];

    this.SrvClientes.setCliente(this.clienteSeleccionado);
    console.log({'SrvCliente.getCliente': this.SrvClientes.getCliente()});


  }



}
