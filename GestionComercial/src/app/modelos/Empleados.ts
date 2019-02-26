import { Personas } from './Personas';

export class Empleados {
    empleados_id : number;
    legajo : number;
    fecha_ingreso : Date;
    descripcion : string;
    empresas_id : number;
    oficina : number;
    persona : Personas;
}