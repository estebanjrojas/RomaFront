import { Clientes } from './Clientes';
import { VentasDetalle } from './VentasDetalle';

export class Ventas {
    monto_total: number;
    vendedor: any;
    cliente: Clientes;
    detalles: VentasDetalle[];
    fecha?: Date;
}