import {Deserializable} from "./deserializable";

export class Categorias{
    id: number;
    name: string;
    descrip?: string;
    children?: Categorias[];


}