import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  Input,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Clientes } from "src/app/comunes/interfaces/Clientes";
import { Personas } from "src/app/comunes/interfaces/Personas";
import { Domicilios } from "src/app/comunes/interfaces/Domicilios";
import { SeleccionClientesComponent } from "../../administracion/adm-clientes/seleccion-clientes/seleccion-clientes.component";
import { VentasDetalle } from "src/app/comunes/interfaces/VentasDetalle";
import { CargaDetalleVentaComponent } from "../carga-detalle-venta/carga-detalle-venta.component";

@Component({
  selector: "app-nueva-venta",
  templateUrl: "./nueva-venta.component.html",
  styleUrls: ["./nueva-venta.component.scss"],
})
export class NuevaVentaComponent implements OnInit {
  @ViewChild(SeleccionClientesComponent, { static: true })
  selectorClientes: SeleccionClientesComponent;
  @ViewChild(CargaDetalleVentaComponent, { static: false })
  detalleVenta: CargaDetalleVentaComponent;
  nuevaVentaForm: FormGroup;
  clienteSeleccionado: Clientes;
  personaSeleccionada: Personas;
  domicilioPersonaSeleccionada: Domicilios;
  @Input() listaDetalleVentas: VentasDetalle[];

  constructor(private formBuilder: FormBuilder) {
    this.nuevaVentaForm = this.formBuilder.group({
      nombre_usuario: ["", Validators.compose([])],

      productosBuscar: [],
    });
  }

  actualizarClienteSeleccionado(event) {
    this.clienteSeleccionado = this.selectorClientes.clienteSeleccionado;
  }

  actualizarDetalleVenta(event) {
    this.listaDetalleVentas = this.detalleVenta.listaDetalleVentas;
  }

  ngOnInit() {}

  seleccionarCliente(cliente) {}
}
