import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargar-promociones',
  templateUrl: './cargar-promociones.component.html',
  styleUrls: ['./cargar-promociones.component.css']
})
export class CargarPromocionesComponent implements OnInit {

  //Instancias
  promocionesForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.promocionesForm = this.formBuilder.group({
      nombre_promocion: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      descripcion_promocion: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      fecha_desde: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      fecha_hasta: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      producto: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      tipo: [
        '', Validators.compose([
        ])
      ],
      valor: [
        '', Validators.compose([
        ])
      ],
      unidad: [
        '', Validators.compose([
        ])
      ],
      nombre_usuario: [
        '', Validators.compose([

        ])
      ]
    });
  }
  ngOnInit() {
  }

}
