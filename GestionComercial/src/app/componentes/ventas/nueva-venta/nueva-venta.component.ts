import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css']
})
export class NuevaVentaComponent implements OnInit {
  nuevaVentaForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {

    this.nuevaVentaForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],

      productosBuscar: []
    });

  }

  ngOnInit() {
  }

  seleccionarCliente(cliente) {
    console.log(cliente);
  }
}
