import { Domicilios } from './Domicilios';

export class Personas {
    personas_id : number;
    nro_doc : number;
    tipo_doc : number;
    apellido : string;
    nombre : string;
    telefono : string;
    telefono_cel : string;
    email : string;
    fecha_nac : Date;
    tipo_persona : number;
    estado_civil : number;
    fecha_cese : Date;
    telefono_caracteristica : string;
    celular_caracteristica : string;
    domicilio : Domicilios;
}