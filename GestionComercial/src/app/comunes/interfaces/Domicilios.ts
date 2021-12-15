import { Ciudades} from './ciudades';

export class Domicilios{
    domicilios_id : number;
    calle ?: string;
    numero ?: string;
    piso ?: string;
    depto ?: string;
    manzana ?: string;
    lote ?: string;
    block ?: string;
    barrio ?: string;
    ciudad ?: Ciudades;
}