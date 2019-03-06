import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargar-puntos-de-venta',
  templateUrl: './cargar-puntos-de-venta.component.html',
  styleUrls: ['./cargar-puntos-de-venta.component.css']
})
export class CargarPuntosDeVentaComponent implements OnInit {

  //Instancias
  puntosdeventaForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.puntosdeventaForm = this.formBuilder.group({
      sucursal: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      numero: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      fecha_alta: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      tipo: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      ultimo_nro_factura: [
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