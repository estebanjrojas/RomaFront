import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-busqueda-ventas',
  templateUrl: './busqueda-ventas.component.html',
  styleUrls: ['./busqueda-ventas.component.css']
})
export class BusquedaVentasComponent implements OnInit {

  busquedaVentasForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
   
    this.busquedaVentasForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],
      txtBuscar: []
    });


  }

  ngOnInit() {
  }

}
