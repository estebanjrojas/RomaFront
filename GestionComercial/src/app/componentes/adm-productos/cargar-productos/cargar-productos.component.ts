import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargar-productos',
  templateUrl: './cargar-productos.component.html',
  styleUrls: ['./cargar-productos.component.css']
})
export class CargarProductosComponent implements OnInit {

  //Instancias
  productosForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
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
      prueba: [
        '', Validators.compose([

        ])
      ]
    });
   }

  ngOnInit() {
  }

}
