import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../../servicios/categorias.service';
import { ProductosService } from '../../../servicios/productos.service';
import { VentasService } from '../../../servicios/ventas.service';
import { Categorias } from '../../../modelos/Categorias';
import { Productos } from '../../../modelos/Productos';
import { VentasDetalle } from '../../../modelos/VentasDetalle';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


@Component({
  selector: 'app-carga-detalle-venta',
  templateUrl: './carga-detalle-venta.component.html',
  styleUrls: ['./carga-detalle-venta.component.css']
})
export class CargaDetalleVentaComponent implements OnInit {
  cargaDetalleVentaForm: FormGroup;
  productos: any = [];
  categoriaSeleccionada: Categorias = {'id': 0, 'name': 'Todas las Categorias'};
  listaDetalleVentas: VentasDetalle[];

   //Arbol de Categorias
   treeControl = new NestedTreeControl<Categorias>(node => node.children);
   dataSource = new MatTreeNestedDataSource<Categorias>();

  constructor(private formBuilder: FormBuilder
            , private SrvCategorias: CategoriasService
            , private SrvProductos: ProductosService
            , private SrvVentas: VentasService) {
    this.cargaDetalleVentaForm = this.formBuilder.group({
      txtBuscarProducto: [],
      txtCantidad: [],
      cbTipoBusquedaProducto: []
    });


  this.SrvCategorias.obtenerJSONTodasCategorias().subscribe(resp => {
    console.log({ "SrvCategorias.obtenerJSONTodasCategorias": resp });
    let cast: any = resp;
    this.SrvCategorias.setCategorias(JSON.parse(cast.categorias));
  });

  const categoriasObservable = this.SrvCategorias.getCategorias();
  categoriasObservable.subscribe((categoriasData: Categorias[]) => {
    console.log(categoriasData);
    this.dataSource.data = categoriasData;
  }, err => { console.error('Error al obtener categorias: ' + err); }
    , () => {
    });

  }


  hasChild = (_: number, node: Categorias) => !!node.children && node.children.length > 0;




  ngOnInit() {
    this.listaDetalleVentas = this.SrvVentas.getDetalleVentaActual();
    this.cargaDetalleVentaForm.controls.cbTipoBusquedaProducto.setValue("nombre");
    this.cargaDetalleVentaForm.controls.txtCantidad.setValue("1");
  }

  buscarProductos() {
    let textoBuscar = this.cargaDetalleVentaForm.get('txtBuscarProducto').value;
    const campoBuscar = this.cargaDetalleVentaForm.get('cbTipoBusquedaProducto').value;
    textoBuscar = (textoBuscar == undefined)? '' : textoBuscar;
    this.SrvProductos.getProductosPorCategoriaCampoBusqueda(this.categoriaSeleccionada.id, campoBuscar, textoBuscar).subscribe(resp => {
      console.log({'SrvProductos.getProductosPorCategoriaCampoBusqueda': resp});
      const cast: any = resp;
      this.productos = cast;
    });


  }


  seleccionarProducto(index, producto) {
    console.log({"index": index, "producto": producto});
    const cantidad = this.cargaDetalleVentaForm.get('txtCantidad').value;
    const subtotal = producto.precio * cantidad;

    const productoAgregar: Productos = {
      'productos_id': producto.productos_id,
      'nombre': producto.nombre,
      'descripcion': producto.descripcion,
      'descripcion_factura': producto.descripcion_factura,
      'precio_actual': producto.precio
    }

    const detalleVentaAgregar: VentasDetalle = {
      'cantidad': cantidad,
      'subtotal': subtotal,
      'descuento': 0,
      'producto': productoAgregar
    }

    this.SrvVentas.agregarDetalleVentaActual(detalleVentaAgregar);
    this.listaDetalleVentas = this.SrvVentas.getDetalleVentaActual();
    console.log(this.listaDetalleVentas);


  }


  quitarDetalleVenta(detalle: VentasDetalle) {
    this.SrvVentas.quitarDetalleVenta(detalle);
  }


  seleccionarCategoria(categoria) {
    console.log(categoria);
    this.categoriaSeleccionada = categoria;

  }



}

/**
 * Estructura anidada para los datos de las categorias
 * Cada nodo tiene una opcion y una lista de hijos
 */
interface CategoriasNode {
  id?: number;
  name: string;
  children?: CategoriasNode[];
}
