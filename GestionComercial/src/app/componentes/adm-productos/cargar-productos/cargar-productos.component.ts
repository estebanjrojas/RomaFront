import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../servicios/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

@Component({
  selector: 'app-cargar-productos',
  templateUrl: './cargar-productos.component.html',
  styleUrls: ['./cargar-productos.component.css']
})
export class CargarProductosComponent implements OnInit {

  //Variables
  submitted: boolean = false;
  nomb_usr: string;

  caracteristicas = new Array<Caracteristica>();

  //Instancias
  productosForm: FormGroup;
    //Arbol de Categorias
    treeControl = new NestedTreeControl<CategoriasNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<CategoriasNode>();

    //Constructor
  constructor(private formBuilder: FormBuilder
    , private route: ActivatedRoute
    , private router: Router
    , private toastr: ToastrService
    , private SrvProductos: ProductosService) {

      this.dataSource.data = CATEGORIAS_DATA;


    this.productosForm = this.formBuilder.group({
      codigo: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      nombre_producto: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      descripcion_producto: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      tipo: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      precio: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      unidad: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      descripcion_factura: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      nombre: [
        '', Validators.compose([
        ])
      ],
      descripcion: [
        '', Validators.compose([
        ])
      ],
      unidad_medida: [
        '', Validators.compose([
        ])
      ],
      valor: [
        '', Validators.compose([
        ])
      ],
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],
      id_producto: [
        '', Validators.compose([

        ])
      ]
    });
  }

  hasChild = (_: number, node: CategoriasNode) => !!node.children && node.children.length > 0;

  ngOnInit() {

    this.nomb_usr = localStorage.getItem('nomb_usr');
    this.productosForm.controls.nombre_usuario.setValue(this.nomb_usr);
    this.route.params.subscribe(params => {
      this.productosForm.controls.id_producto.setValue(params.productos_id);
      console.log(params);
    });

    this.getDatosProductos();

  }



  getDatosProductos() {
    let id_producto = this.productosForm.controls.id_producto.value;
    console.log("ID que traigo: " + id_producto);
    if (id_producto != null || id_producto != undefined) {
      console.log("paso por aqui");
      this.SrvProductos.getDatosProductos(id_producto).subscribe(resp => {
        let respuesta: any = resp;
        console.log({ "SrvProductos.getDatosProductos": respuesta });

        this.productosForm.patchValue({
          codigo: respuesta[0].codigo,
          nombre_producto: respuesta[0].nombre,
          descripcion_producto: respuesta[0].descripcion,
          descripcion_factura: respuesta[0].descripcion_factura,
          tipo: respuesta[0].tipo_producto,
          precio: respuesta[0].monto,
          unidad: respuesta[0].unidad
        });
        console.log("Tipo Producto: " + this.productosForm.controls.tipo.value);
      });

      this.SrvProductos.getCaracteristicasProductos(id_producto).subscribe(resp => {
        let respuesta: any = resp;
        console.log({ "SrvProductos.getCaracteristicasProductos": respuesta });
        console.log("ID PRODUCTO:" + id_producto);

        for (let resp of respuesta)
          this.caracteristicas.push({
            'nombre': resp.nombre,
            'descripcion': resp.descripcion,
            'unidad_medida': resp.unidad_medida,
            'valor': resp.valor
          });
      });

    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 == c2 : false;
  }

  agregarDatosTablita() {

    var _nom = this.productosForm.controls.nombre.value;
    var _descrip = this.productosForm.controls.descripcion.value;
    var _uni = this.productosForm.controls.unidad_medida.value;
    var _val = this.productosForm.controls.valor.value;

    if (_nom != null && _descrip.length != 0 && _val.length != 0 && _uni != 0 && _uni != undefined) {
      this.caracteristicas.push({ 'nombre': _nom, 'descripcion': _descrip, 'unidad_medida': _uni, 'valor': _val });
      this.productosForm.controls.nombre.reset();
      this.productosForm.controls.descripcion.reset();
      this.productosForm.controls.unidad_medida.reset();
      this.productosForm.controls.valor.reset();
    } else {
      alert("Todos los campos son obligatorios...");
      this.toastr.error('Todos los campos son obligatorios...', "ERROR");
      document.getElementById("nombretablita").focus();
    }
  }

  borrarFila(value) {
    var array = this.caracteristicas;
    array.splice(value, 1);
  }


  //Guardar Nuevo Producto
  guardar() {

    let id_producto = this.productosForm.controls.id_producto.value;

    if (id_producto == null || id_producto == undefined) {
      this.submitted = true;
      if (this.productosForm.valid) {
        console.log(JSON.stringify(this.productosForm.value));
        this.SrvProductos.insertProductoReturnId(this.productosForm.value).subscribe(respuesta => {
          console.log({ "SrvProductos.insertProductoReturnId": respuesta });
          let cast: any = respuesta;

          for (let caract of this.caracteristicas) {
            this.SrvProductos.insertCaracteristicasProducto(caract, cast.id).subscribe(resp => {
              console.log({ "SrvProductos.insertCaracteristicasProducto": resp });
              this.toastr.success('Caracteristicas cargadas exitosamente');
            });
          }
          this.toastr.success('El Producto se ha CARGADO Exitosamente');
          this.productosForm.reset();
        });
      }
      else {
        this.productosForm.getError;
        console.log(this.productosForm);
      }
    } else {
      //Modificar Producto
      if (this.productosForm.valid) {
        console.log(JSON.stringify(this.productosForm.value));
        this.SrvProductos.actualizarDatosProductos(this.productosForm.value).subscribe(respuesta => {
          console.log({ "SrvAvisos.actualizarDatosProductos": respuesta });

          this.SrvProductos.eliminarCaracteristicasProductos(id_producto).subscribe(respuesta => {
            console.log({ "SrvProductos.eliminarCaracteristicasProductos": respuesta });

            for (let caract of this.caracteristicas) {
              this.SrvProductos.insertCaracteristicasProducto(caract, id_producto).subscribe(resp => {
                console.log({ "SrvProductos.insertCaracteristicasProducto": resp });
                this.toastr.success('Caracteristicas cargadas exitosamente');
              });
            }

            this.toastr.success('El producto se ha ACTUALIZADO Exitosamente');
            this.productosForm.reset();
            this.router.navigate(['productos/busqueda-productos']);
          });





        });
      } else {
        this.productosForm.getError;
        console.log(this.productosForm);
      }

    }
  }

  
agregarCategoria(id) {
  console.log(id);
}


}



interface Caracteristica {
  nombre: Text,
  descripcion: Text,
  unidad_medida: number,
  valor: any

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

const CATEGORIAS_DATA: CategoriasNode[] = [
  {
    id: 1,
    name: 'Computacion',
    children: [
      {id: 2, name: 'Accesorios'},
      {id: 3, name: 'Computadoras',
        children:[
          {id: 7, name:'Notebooks'},
          {id: 6, name: 'PCs de Escritorio'}
          ]
      },
      {id:5, name: 'Componentes',
          children: [
            {id: 8, name: 'Placas Madre'},
            {id: 9, name: 'Memorias'},
            {id: 10, name: 'Procesadores'},
            {id: 11, name: 'Placas de Video'},
            {id: 12, name: 'Discos Rigidos'},
            {id: 13, name: 'Fuentes'},
            {id: 14, name: 'Gabinetes'},
            {id: 15, name: 'Placas de Sonido'}
          ]},
      {id: 4, name: 'Pantallas'},
    ]
  }, 
];

