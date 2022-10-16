import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { VentasDetalle } from "../../../../../comunes/interfaces/VentasDetalle";
import { Clientes } from "../../../../../comunes/interfaces/Clientes";
import { VentasService } from "../../../../../comunes/servicios/ventas.service";
import { ClientesService } from "../../../../../comunes/servicios/clientes.service";
import { UsuariosService } from "../../../../../comunes/servicios/usuarios.service";
import { Ventas } from "../../../../../comunes/interfaces/Ventas";

@Component({
  selector: "app-confirmacion-venta",
  templateUrl: "./confirmacion-venta.component.html",
  styleUrls: ["./confirmacion-venta.component.scss"],
})
export class ConfirmacionVentaComponent implements OnInit {
  confirmacionVentaForm: FormGroup;
  listaDetalleVentas: VentasDetalle[];
  @Input() clienteSeleccionado: Clientes;
  usuario: string = localStorage.getItem("roma_usuario");
  vendedor: Vendedor = {
    empleados_id: 0,
    empresas_id: 0,
    documento: 0,
    apellido: "",
    nombre: "",
    email: "",
    legajo: "",
    fecha_ingreso: "",
    descripcion_usuario: "",
    descripcion_empleado: "",
  };
  constructor(
    private formBuilder: FormBuilder,
    private SrvVentas: VentasService,
    private SrvClientes: ClientesService,
    private SrvUsuarios: UsuariosService
  ) {
    this.confirmacionVentaForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.getVendedor();
    this.getClienteSeleccionado();
    this.listaDetalleVentas = this.SrvVentas.getDetalleVentaActual();
  }

  getClienteSeleccionado() {
    this.clienteSeleccionado = this.SrvClientes.getCliente();
    this.getVendedor();
  }

  getVendedor() {
    this.SrvUsuarios.getDatosUsuario(this.usuario).subscribe((respuesta) => {
      let cast: any = respuesta;
      this.vendedor = {
        empleados_id: cast[0].empleados_id,
        empresas_id: cast[0].empresas_id,
        documento: cast[0].nro_doc,
        apellido: cast[0].apellido,
        nombre: cast[0].nombre,
        email: cast[0].email,
        legajo: cast[0].legajo,
        fecha_ingreso: cast[0].fecha_ingreso,
        descripcion_usuario: cast[0].descripcion_usuario,
        descripcion_empleado: cast[0].descripcion_empleado,
      };
    });
  }

  guardarVenta() {
    let monto_total: number = 0;
    for (let i = 0; i < this.listaDetalleVentas.length; i++) {
      monto_total = monto_total + this.listaDetalleVentas[i].subtotal;
    }

    let venta: Ventas = {
      monto_total: monto_total,
      cliente: this.clienteSeleccionado,
      detalles: this.listaDetalleVentas,
      vendedor: this.vendedor,
    };

    this.SrvVentas.insertVentaReturningFactura(venta).subscribe(() => {});
  }
}

interface Vendedor {
  empleados_id: number;
  empresas_id: number;
  documento: number;
  apellido: string;
  nombre: string;
  email: string;
  fecha_ingreso: string;
  legajo: string;
  descripcion_usuario: string;
  descripcion_empleado: string;
}
