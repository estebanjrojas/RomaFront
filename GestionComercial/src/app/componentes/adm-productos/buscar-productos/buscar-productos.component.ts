import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../../servicios/productos.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {

  //Instancias
  buscarproductosForm: FormGroup;
  cast: any;

  constructor(private SrvEmpleados: ProductosService,
    private SrvToastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.buscarproductosForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],
      txtBuscar: []
    });
  }
  ngOnInit() {
    this.buscarProducto();
  }

  buscarProducto() {
    let busqueda = this.buscarproductosForm.controls.txtBuscar.value;
    if (busqueda == undefined || busqueda == '') {
      this.SrvEmpleados.getProductosTodos().subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvProductos.getProductosTodos": this.cast });
      });
    }
    else {
      this.SrvEmpleados.getProductosBusqueda(busqueda).subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvProductos.getProductosBusqueda": this.cast });
      });
    }
  }


  actualizarProducto(productos_id) {
    console.log("Actualizar: " + productos_id);
  }

  eliminarProducto(productos_id) {
    alert("Baja sin emplementar");
    console.log(" Baja de Producto: " + productos_id);
  }


}
