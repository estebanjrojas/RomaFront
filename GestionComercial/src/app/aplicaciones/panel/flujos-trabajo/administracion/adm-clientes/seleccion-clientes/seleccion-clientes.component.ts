import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ClientesService } from "../../../../../../comunes/servicios/clientes.service";
import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";
import { Clientes } from "../../../../../../comunes/interfaces/Clientes";
import { Personas } from "../../../../../../comunes/interfaces/Personas";
import { Domicilios } from "../../../../../../comunes/interfaces/Domicilios";

@Component({
  selector: "app-seleccion-clientes",
  templateUrl: "./seleccion-clientes.component.html",
  styleUrls: ["./seleccion-clientes.component.scss"],
})
export class SeleccionClientesComponent implements OnInit {
  seleccionClientesForm: FormGroup;
  clientes: any;
  @Input() clienteSeleccionado: Clientes;
  @Input() personaSeleccionada: Personas;
  @Input() domicilioPersonaSeleccionada: Domicilios;
  @Output() seElijioCliente = new EventEmitter();

  constructor(
    private SrvClientes: ClientesService,
    private formBuilder: FormBuilder
  ) {
    this.seleccionClientesForm = this.formBuilder.group({
      txtBuscarCliente: [],
      cbTipoBusquedaCliente: [1],
    });
  }

  ngOnInit() {
    this.seleccionClientesForm.controls.cbTipoBusquedaCliente.setValue("1");
  }

  buscarClientes() {
    const texto_busqueda =
      this.seleccionClientesForm.get("txtBuscarCliente").value;
    const campo_busqueda = this.seleccionClientesForm.get(
      "cbTipoBusquedaCliente"
    ).value;

    this.SrvClientes.getClientesWhere(campo_busqueda, texto_busqueda).subscribe(
      (respuesta) => {
        this.clientes = respuesta;
        console.log({ "SrvClientes.getClientesWhere": this.clientes });
      }
    );
  }

  seleccionarCliente(cliente: any) {
    if (cliente.domicilios_id != undefined) {
      //Cargar Domicilio
      this.domicilioPersonaSeleccionada = {
        domicilios_id: cliente.domicilios_id,
        calle: cliente.calle,
        numero: cliente.domicilio_numero,
        piso: cliente.piso,
        depto: cliente.depto,
        manzana: cliente.manzana,
        lote: cliente.lote,
        barrio: cliente.barrio,
        ciudad: {
          id: cliente.ciudades_id,
          nombre: cliente.ciudad_nombre,
          provincia: {
            id: cliente.provincias_id,
            nombre: cliente.provincias_nombre,
          },
          codigo_postal: cliente.codigo_postal,
        },
      };
    }

    this.personaSeleccionada = {
      personas_id: cliente.personas_id,
      tipo_doc: cliente.tipo_doc,
      tipo_doc_descrip: cliente.tipo_doc_descrip,
      nro_doc: cliente.nro_doc,
      apellido: cliente.apellido,
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      telefono_cel: cliente.telefono_cel,
      email: cliente.email,
      fecha_nac: cliente.fecha_nac,
      tipo_persona: cliente.tipo_persona,
      estado_civil: cliente.estado_civil,
      fecha_cese: cliente.fecha_cese,
      telefono_caracteristica: cliente.telefono_caracteristica,
      celular_caracteristica: cliente.celular_caracteristica,
      domicilio: this.domicilioPersonaSeleccionada,
    };

    this.clienteSeleccionado = {
      clientes_id: cliente.clientes_id,
      fecha_alta: cliente.fecha_alta,
      persona: this.personaSeleccionada,
    };
    this.clientes = [];

    this.SrvClientes.setCliente(this.clienteSeleccionado);
    console.log({ "SrvCliente.getCliente": this.SrvClientes.getCliente() });
    this.seElijioCliente.emit(this.clienteSeleccionado);
  }
}
