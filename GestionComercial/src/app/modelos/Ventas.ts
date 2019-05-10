import { Clientes } from './Clientes';
import { VentasDetalle } from './VentasDetalle';

export class Ventas {
    vendedor: any;
    cliente: Clientes;
    detalles: VentasDetalle[];
    fecha?: Date;
}