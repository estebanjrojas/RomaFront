import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargar-usuarios',
  templateUrl: './cargar-usuarios.component.html',
  styleUrls: ['./cargar-usuarios.component.css']
})
export class CargarUsuariosComponent implements OnInit {

  //Instancias
  usuariosForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.usuariosForm = this.formBuilder.group({
      empleado: [
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