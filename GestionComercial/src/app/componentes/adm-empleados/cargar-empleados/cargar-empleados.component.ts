import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabgralService } from '../../../servicios/tabgral.service';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { DomiciliosService } from '../../../servicios/domicilios.service';
import { Ciudades } from '../../../modelos/Ciudades';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


export interface CiudadesInterface {
  descrip: string;
}




@Component({
  selector: 'app-cargar-empleados',
  templateUrl: './cargar-empleados.component.html',
  styleUrls: ['./cargar-empleados.component.css']
})
export class CargarEmpleadosComponent implements OnInit {

  provincias : any;
  empleadosForm: FormGroup;
  nombre_usuario = new FormControl('', Validators.required);

  ciudadesInput = new FormControl();

  ciudades: CiudadesInterface[] = [];

  ciudadesClass: Ciudades = new Ciudades();


  filteredOptions: Observable<CiudadesInterface[]>;

  constructor(private tabgral: TabgralService
    , private SrvEmpleados: EmpleadosService
    , private SrvDomicilios: DomiciliosService
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

  getCiudadesPorProvincia() {
    let provincias_id = this.empleadosForm.controls.provincia.value;
    this.SrvDomicilios.getCiudadesPorProvincia(provincias_id).subscribe(respuesta => {
      let cast: any = respuesta;
      console.log({"SrvDomicilios.getCiudadesPorProvincia" : cast});
      for(let i=0; i<cast.length; i++) {
        this.ciudades.push({descrip : cast[i].nombre.trim()}); 
        //por alguna razon el nombre viene con espacios en blanco alrededor asi que se hace un trim por javascript
      }
      console.log(this.ciudades);
      
      
    })
  }

  ngOnInit() {



    //Llenado de combo provincias
    this.SrvDomicilios.getProvinciasPorPais(1).subscribe(respuesta => {
      console.log({"SrvDomicilios.getProvinciasPorPais(1)" : respuesta});
      this.provincias = respuesta;
      this.empleadosForm.controls.provincia.setValue(1);
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


