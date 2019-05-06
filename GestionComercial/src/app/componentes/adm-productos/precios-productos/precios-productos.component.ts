import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from '../../../servicios/productos.service';


@Component({
  selector: 'app-precios-productos',
  templateUrl: './precios-productos.component.html',
  styleUrls: ['./precios-productos.component.css']
})
export class PreciosProductosComponent implements OnInit {
  @Input() producto: any;

  constructor(private SrvProductos: ProductosService) { }

  ngOnInit() {
    
  }

}

