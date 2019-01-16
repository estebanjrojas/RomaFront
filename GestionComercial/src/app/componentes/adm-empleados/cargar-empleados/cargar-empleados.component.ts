import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabgralService } from '../../../servicios/tabgral.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cargar-empleados',
  templateUrl: './cargar-empleados.component.html',
  styleUrls: ['./cargar-empleados.component.css']
})
export class CargarEmpleadosComponent implements OnInit {

  provincias = new Array<Tabgral>();
  empleadosForm: FormGroup;

  nombre_usuario = new FormControl('', Validators.required);
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;


  constructor(private tabgral: TabgralService
    , private toastr: ToastrService
    , private formBuilder: FormBuilder) {
    this.empleadosForm = this.formBuilder.group({
      documento: [
        '', Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*')
        ])
      ],
      apellido: [
        '', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*')
        ])
      ],
      nombre: [
        '', Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]*')
        ])
      ],
      fecha_nacimiento: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      calle: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      numero: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      piso: [
        '', Validators.compose([
        ])
      ],
      depto: [
        '', Validators.compose([
        ])
      ],
      manzana: [
        '', Validators.compose([
        ])
      ],
      provincia: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      ciudad: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      legajo: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      oficina: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      fecha_ingreso: [
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

        ])
      ]

    });
  }


  ngOnInit() {

    //Llenado de combo provincias
    this.tabgral.selectByNroTab(191).subscribe(respuesta => {
      console.log(respuesta);
      let cast: any = respuesta;
      for (var i = 0; i < cast.length; i++) {
        let rel: Tabgral = { codigo: "0", descrip: "" };
        rel.codigo = cast[i].codigo;
        rel.descrip = cast[i].descrip;
        this.provincias.push(rel);
      }
      this.empleadosForm.controls.provincia.setValue(1);
    });
  }

}


interface Tabgral {
  codigo: string;
  descrip: string;
}

