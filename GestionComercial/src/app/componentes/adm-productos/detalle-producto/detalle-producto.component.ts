import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from '../../../servicios/productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  @Input() producto: any;
  caracteristicas: ProductosCaracteristicas[];
  categorias: Categorias[];
  imagenes: Imagenes[];

  constructor(private SrvProductos: ProductosService) { }

  ngOnInit() {
    this.SrvProductos.getCaracteristicasProductos(this.producto.productos_id).subscribe(resp => {
      console.log({"SrvProductos.getCaracteristicasProductos " : resp});
      let cast: any = resp;
      this.caracteristicas = cast;
    });

    this.SrvProductos.getCategoriasProductos(this.producto.productos_id).subscribe(resp => {
      console.log({"SrvProductos.getCategoriasProductos" : resp});
      let cast: any = resp;
      this.categorias = cast;
    });

    this.SrvProductos.getImagenesProductos(this.producto.productos_id).subscribe(resp => {
      console.log({"SrvProductos.getImagenesProductos" : resp});
      let cast: any = resp;
      this.imagenes = cast;
    });

    console.log(this.imagenes);
  }

}


interface ProductosCaracteristicas {
  caracteristicas_id: number;
  nombre: string;
  descripcion: string;
  valor: string;
}

interface Categorias {
  categorias_id: number;
  nombre: string;
  categoria_padre: string;
}

interface Imagenes {
  id: number;
  imagen: string;
  fecha_carga: string;
  orden: number;
  principal: boolean;
  productos_id: number;
}
