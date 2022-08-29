import { Ciudades } from "./ciudades";

export class Domicilios {
  domicilios_id: string;
  calle?: string;
  numero?: string;
  piso?: string;
  depto?: string;
  manzana?: string;
  lote?: string;
  block?: string;
  barrio?: string;
  ciudad?: Ciudades;
  persona_id?: string;
  tipo_domicilio?: number;
  observaciones?: string;
  tipo_domicilio_descrip?: string;
  ciudad_descripcion?: string;
  ciudad_departamento_descrip?: string;
  departamento_descripcion?: string;
  provincia_descripcion?: string;
  provincia_id?: string;
  pais_descrip?: string;
  descripcion_larga?: string;
  nombreDom?: string;
  calle_descripcion?: string;
  numero_puerta?: string;
  dpto?: string;
  ciudades_id?: string;
  calles_id?: string;
  localidad_id?: string;
  departamento_id?: string;
  nombre_usuario?: string;
}
