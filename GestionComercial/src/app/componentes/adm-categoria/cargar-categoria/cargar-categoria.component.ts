import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargar-categoria',
  templateUrl: './cargar-categoria.component.html',
  styleUrls: ['./cargar-categoria.component.css']
})
export class CargarCategoriaComponent implements OnInit {

  //Instancias
  categoriasForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.categoriasForm = this.formBuilder.group({
      nombre: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      descripcion: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      nombre_usuario: [
        '', Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  ngOnInit() {
  }

}
