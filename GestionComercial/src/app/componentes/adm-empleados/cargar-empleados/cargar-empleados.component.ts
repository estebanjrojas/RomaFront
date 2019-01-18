import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabgralService } from '../../../servicios/tabgral.service';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { Ciudades } from '../../../modelos/Ciudades';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

//Agregado hoy
export interface CiudadesInterface {
  descrip: string;
}
//Fin agregado hoy



@Component({
  selector: 'app-cargar-empleados',
  templateUrl: './cargar-empleados.component.html',
  styleUrls: ['./cargar-empleados.component.css']
})
export class CargarEmpleadosComponent implements OnInit {

  provincias = new Array<Tabgral>();
  empleadosForm: FormGroup;
  nombre_usuario = new FormControl('', Validators.required);

  ciudadesInput = new FormControl();

  ciudades: CiudadesInterface[] = [
    { descrip: "San miguel de tucuman" },
    { descrip: "Tucuman" }
  ];

  ciudadesClass: Ciudades = new Ciudades();


  filteredOptions: Observable<CiudadesInterface[]>;

  constructor(private tabgral: TabgralService
    , private empleadosService: EmpleadosService
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
      ], ciudades: ''

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

    //Obtengo ciudades y las asigno a la clase Ciudades.
    this.tabgral.selectByNroTab(16).subscribe(respuesta => {
      console.log(respuesta);
      let cast: any = respuesta;
      this.ciudadesClass = cast;
      //console.log("ciudades:"+this.ciudades[2].descrip);
    });


    this.filteredOptions = this.ciudadesInput.valueChanges
      .pipe(
        startWith<string | CiudadesInterface>(''),
        map(value => typeof value === 'string' ? value : value.descrip),
        map(descrip => descrip ? this._filter(descrip) : this.ciudades.slice())
      );
  }


  displayFn(user?: CiudadesInterface): string | undefined {
    return user ? user.descrip : undefined;
  }

  private _filter(descrip: string): CiudadesInterface[] {
    const filterValue = descrip.toLowerCase();

    return this.ciudades.filter(option => option.descrip.toLowerCase().indexOf(filterValue) === 0);
  }



}


interface Tabgral {
  codigo: string;
  descrip: string;
}

