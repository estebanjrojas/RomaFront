import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../servicios/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cargar-productos',
  templateUrl: './cargar-productos.component.html',
  styleUrls: ['./cargar-productos.component.css']
})
export class CargarProductosComponent implements OnInit {

  //Variables
  submitted: boolean = false;

  //Instancias
  productosForm: FormGroup;


  //Constructor
  constructor(private formBuilder: FormBuilder
    , private route: ActivatedRoute
    , private router: Router
    , private toastr: ToastrService
    , private SrvProductos: ProductosService) {
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
          Validators.required
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

  ngOnInit() {


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
        console.log({ "SrvProductos.getProductosTodos": respuesta });

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


    var fila = "<tr><td style='padding-left:20px'>" + _nom
      + "</td><td>" + _descrip
      + "</td><td  style='text-align: center'>" + _uni
      + "</td><td  style='text-align: center'>" + _val
      + "</td><td  style='text-align: center'><button class='btn btn-danger btn-sm' click='deleteRow(this);'>X</button></td></tr>";

    if (_nom != null && _descrip.length != 0 && _val.length != 0 && _uni != 0) {
      var btn = document.createElement("TR");
      btn.innerHTML = fila;
      document.getElementById("tablita").appendChild(btn);
      this.productosForm.controls.nombre.reset();
      this.productosForm.controls.descripcion.reset();
      this.productosForm.controls.unidad_medida.reset();
      this.productosForm.controls.valor.reset();
      document.getElementById("nombretablita").focus();
    } else {
      alert("Todos los campos son obligatorios...");
      document.getElementById("nombretablita").focus();
    }
  }

  borrarRegistroTablita(param) {
    var i = param.parentNode.parentNode.rowIndex;
    (<HTMLTableElement>document.getElementById("tablita")).deleteRow(i);
  }

  deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }


  //Guardar Nuevo Producto
  guardar() {

    let id_producto = this.productosForm.controls.id_producto.value;

    if (id_producto == null || id_producto == undefined) {
      this.submitted = true;
      if (this.productosForm.valid) {
        console.log(JSON.stringify(this.productosForm.value));
        this.SrvProductos.cargarProducto(this.productosForm.value).subscribe(respuesta => {
          console.log({ "SrvProductos.cargarProducto": respuesta });
          let cast: any = respuesta;

          this.toastr.success('El Fallecido se ha CARGADO Exitosamente');
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
        this.SrvProductos.actualizarDatosProducto(this.productosForm.value).subscribe(respuesta => {
          console.log({ "SrvProductos.actualizarDatosProducto": respuesta });
          let cast: any = respuesta;
          this.toastr.success('El producto se ha ACTUALIZADO Exitosamente');
          this.productosForm.reset();
          this.router.navigate(['productos/busqueda-productos']);
        });
      } else {
        this.productosForm.getError;
        console.log(this.productosForm);
      }

    }
  }


}
