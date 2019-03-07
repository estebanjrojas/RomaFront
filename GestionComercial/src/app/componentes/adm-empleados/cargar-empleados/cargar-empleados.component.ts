import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabgralService } from '../../../servicios/tabgral.service';
import { EmpleadosService } from '../../../servicios/empleados.service';
import { DomiciliosService } from '../../../servicios/domicilios.service';
import { Ciudades } from '../../../modelos/Ciudades';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PersonasService} from '../../../servicios/personas.service';
import { Empleados } from '../../../modelos/Empleados';
import { Provincias } from 'src/app/modelos/Provincias';


export interface CiudadesInterface {
  descrip: string;
}

@Component({
  selector: 'app-cargar-empleados',
  templateUrl: './cargar-empleados.component.html',
  styleUrls: ['./cargar-empleados.component.css']
})
export class CargarEmpleadosComponent implements OnInit {
  miEmpleado : Empleados;
  provincias : Provincias[] = [];
  oficinas : any;
  empleadosForm: FormGroup;
 
  ciudades: CiudadesInterface[] = [];
  ciudadesClass: Ciudades = new Ciudades();


  filteredOptions: Observable<CiudadesInterface[]>;

  constructor(private SrvTabgral: TabgralService
    , private SrvEmpleados: EmpleadosService
    , private SrvPersonas: PersonasService
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
      ciudades: [
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

  buscarPorDocumento() {
    let documento = this.empleadosForm.get('documento').value;
    this.SrvPersonas.getPersonaPorNroDoc(documento).subscribe(respuesta => {
      console.log({"SrvPersonas.getPersonaPorNroDoc" : respuesta});
      
      let cast : any = respuesta;
      if(cast.redirect) {
        console.log('Redireccionar a Login');
      }
      this.empleadosForm.controls.apellido.setValue(cast[0].apellido);
      this.empleadosForm.controls.nombre.setValue(cast[0].nombre);
      this.empleadosForm.controls.fecha_nacimiento.setValue(cast[0].fecha_nac);
    });

    this.SrvEmpleados.getEmpleadoPorNroDoc(documento).subscribe(respuesta => {
      console.log({"SrvEmpleados.getEmpleadoPorNroDoc" : respuesta});
      let cast : any = respuesta;
      if(cast.redirect) {
        console.log('Redireccionar a Login');
      }
      this.empleadosForm.controls.legajo.setValue(cast[0].legajo);
      this.empleadosForm.controls.fecha_ingreso.setValue(cast[0].fecha_ingreso);
      this.empleadosForm.controls.descripcion.setValue(cast[0].descripcion);
      this.empleadosForm.controls.oficina.setValue(cast[0].oficinas_id);
    });

    this.SrvDomicilios.getDomicilioByNroDoc(documento).subscribe(respuesta => {
      console.log({"SrvDomicilios.getDomicilioByNroDoc" : respuesta});
      let cast : any = respuesta[0];
      if(cast.redirect) {
        console.log('Redireccionar a Login');
      }
      if(cast) {
        this.empleadosForm.controls.calle.setValue(cast.calle);
        this.empleadosForm.controls.numero.setValue(cast.numero);
        this.empleadosForm.controls.piso.setValue(cast.piso);
        this.empleadosForm.controls.depto.setValue(cast.depto);
        this.empleadosForm.controls.manzana.setValue(cast.manzana);
        this.empleadosForm.controls.provincia.setValue(cast.provincias_id);
        this.getCiudadesPorProvincia();
      }
      

    });
  }

  ngOnInit() {
    //Llenado de combo provincias
    this.SrvDomicilios.getProvinciasPorPais(1).subscribe(respuesta => {
      console.log({"SrvDomicilios.getProvinciasPorPais" : respuesta});
      let cast : any = respuesta;
      for(let i=0; i<cast.length; i++) {
        this.provincias.push({"id" : cast[i].id, "nombre" : cast[i].nombre});
      }
      
      this.empleadosForm.controls.provincia.setValue(23);
      this.getCiudadesPorProvincia();
    });

    this.SrvTabgral.selectByNroTab(3).subscribe(respuesta => {
      console.log({"SrvTabgral.selectByNroTab" : respuesta});
      this.oficinas = respuesta;
    })

    this.filteredOptions = this.empleadosForm.controls.ciudades.valueChanges
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

  compareFn(c1: any, c2:any): boolean { 
    return c1 && c2 ? c1 == c2 : false; 
  }

  guardarEmpleado() {
    console.log({"Form Valido" : this.empleadosForm.valid});

    if(this.empleadosForm.valid) {
      let ciudades_id = 0;
      let ciudad_nombre = this.empleadosForm.get('ciudades').value.descrip;
      this.SrvDomicilios.getCiudadesIdPorNombre(ciudad_nombre).subscribe(respuesta => {
        console.log({"SrvDomicilios.getCiudadesIdPorNombre" : respuesta});
        let cast : any = respuesta;
        ciudades_id = cast.id;
      });

      let insert_domicilio = {"ciudades_id" : ciudades_id,
                              "calle" : this.empleadosForm.controls.calle.value,
                              "numero" : this.empleadosForm.controls.numero.value,
                              "piso" : this.empleadosForm.controls.piso.value,
                              "depto" : this.empleadosForm.controls.depto.value,
                              "manzana" : this.empleadosForm.controls.manzana.value,
                              "provincias_id" : this.empleadosForm.controls.provincia.value
                            }
      console.log({"Domicilio" : insert_domicilio});
      /*this.SrvDomicilios.insert(insert_domicilio).subscribe( respuesta => {
        console.log({"SrvDomicilios.insert" : respuesta});
        let cast = respuesta[0];
        var domicilios_id = cast.domicilios_id;
      });*/
    }
    else {
      console.log({"Submit Invalido" : this.empleadosForm.controls});
    }
  }

}


