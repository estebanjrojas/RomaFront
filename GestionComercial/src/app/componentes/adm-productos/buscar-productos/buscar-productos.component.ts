import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {

  //Instancias
  buscarproductosForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buscarproductosForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ]
    });
  }
  ngOnInit() {
  }

}
