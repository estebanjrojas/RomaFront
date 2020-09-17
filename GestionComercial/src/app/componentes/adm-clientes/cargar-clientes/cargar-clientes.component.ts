import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TabgralService } from '../../../servicios/tabgral.service';
import { ClientesService } from '../../../servicios/clientes.service';
import { DomiciliosService } from '../../../servicios/domicilios.service';
import { Ciudades } from '../../../modelos/Ciudades';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PersonasService } from '../../../servicios/personas.service';
import { Provincias } from '../../../modelos/Provincias';
import { Router, ActivatedRoute } from '@angular/router';
import { Inject, Injectable, Optional } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import * as moment from 'moment';


@Injectable()
export class MomentUtcDateAdapter extends MomentDateAdapter {

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
    super(dateLocale);
  }

  createDate(year: number, month: number, date: number): Moment {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    let result = moment.utc({ year, month, date }).locale(this.locale);

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }
}




export interface CiudadesInterface {
  id: number;
  descrip: string;
}


@Component({
  selector: 'app-cargar-clientes',
  templateUrl: './cargar-clientes.component.html',
  styleUrls: ['./cargar-clientes.component.css']
})
export class CargarClientesComponent implements OnInit {

  provincias: Provincias[] = [];
  oficinas: any;
  clientesForm: FormGroup;

  ciudades: CiudadesInterface[] = [];
  filteredOptions: Observable<CiudadesInterface[]>;

  nomb_usr: string;
  ciudadesClass: Ciudades = new Ciudades();

  sexo = new Array<Tabgral>();


  constructor(
    private SrvTabgral: TabgralService,
    private SrvClientes: ClientesService,
    private router: Router,
    private SrvPersonas: PersonasService,
    private SrvDomicilios: DomiciliosService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {

    this.clientesForm = this.formBuilder.group({
      documento: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      apellido: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      nombre: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      fecha_nacimiento: ['', Validators.compose([Validators.required])],
      calle: ['', Validators.compose([])],
      numero: ['', Validators.compose([])],
      piso: ['', Validators.compose([])],
      depto: ['', Validators.compose([])],
      manzana: ['', Validators.compose([])],
      provincia: ['', Validators.compose([Validators.required])],
      ciudades: ['', Validators.compose([Validators.required])],
      ciudades_id: ['', Validators.compose([])],
      nombre_usuario: ['', Validators.compose([])],
      tipo_doc: ['', Validators.compose([])],
      sexo: ['', Validators.compose([])],
      telefono: ['', Validators.compose([])],
      celular: ['', Validators.compose([])],
      email: ['', Validators.compose([])],
      clientes_id: [, Validators.compose([])],
      personas_id: [, Validators.compose([])],
      domicilios_id: [, Validators.compose([])]
    });
  }


  ngOnInit() {
    this.obtenerProvincias();

    //Tabgral
    this.SrvTabgral.selectByNroTab(3).subscribe(respuesta => {
      //console.log({ 'SrvTabgral.selectByNroTab': respuesta });
      this.oficinas = respuesta;
    });

    //Sexo
    this.SrvTabgral.selectByNroTab(4).subscribe(respuesta => {
      //console.log({ "SrvTabgral.selectByNroTab(4)": respuesta });
      let cast: any = respuesta;
      for (var i = 0; i < cast.length; i++) {
        let rel: Tabgral = { codigo: "0", descrip: "" };
        rel.codigo = cast[i].codigo;
        rel.descrip = cast[i].descrip;
        this.sexo.push(rel);
      }
    });

    this.nomb_usr = localStorage.getItem('nombre_usr');
    this.clientesForm.controls.nombre_usuario.setValue(this.nomb_usr);
    this.clientesForm.controls.tipo_doc.setValue("3");

    this.route.params.subscribe(params => {
      if (params.clientes_id != null) {
        this.clientesForm.controls.clientes_id.setValue(params.clientes_id);  
      }
    }, err => {
      console.error(`Ocurrio un error al obtener el parametro del cliente. ${err}`);
    });
    this.getDatosCliente(this.clientesForm.controls.clientes_id.value);
    
    

    //Filtro de ciudades por provincia
    this.filteredOptions = this.clientesForm.controls.ciudades.valueChanges
      .pipe(
        startWith<string | CiudadesInterface>(''),
        map(value => typeof value === 'string' ? value : value.descrip),
        map(descrip => descrip ? this._filter(descrip) : this.ciudades.slice())
      );
  }


  //Agregada validación entre objeto y String. REPETIR en Proyecto.
  displayFn(user?: CiudadesInterface): string | undefined {
    return (typeof (user) !== 'string') ? user.descrip : user;
  }

  private _filter(descrip: string): CiudadesInterface[] {
    const filterValue = descrip.toLowerCase();

    return this.ciudades.filter(option => option.descrip.toLowerCase().indexOf(filterValue) === 0);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 == c2 : false;
  }


  getDatosCliente(id_clientes) {
    this.SrvClientes.getDatosClientePorId(id_clientes).subscribe(respuesta => {
      console.log({ "SrvClientes.getDatosClientePorId": respuesta });
      let cast: any = respuesta;


      this.clientesForm.patchValue({
     
        nombre: cast[0].nombre,
        apellido: cast[0].apellido,
        documento: cast[0].nro_doc,
        tipo_doc: cast[0].tipo_doc + "",
        fecha_nacimiento: cast[0].fecha_nac,
        sexo: cast[0].sexo,
        telefono: cast[0].telefono,
        celular: cast[0].telefono_cel,
        email: cast[0].email,
        calle: cast[0].calle,
        numero: cast[0].numero,
        piso: cast[0].piso,
        depto: cast[0].depto,
        manzana: cast[0].manzana,
        provincia: cast[0].provincias_id,
        ciudades: cast[0].ciudad_nombre,
        personas_id: cast[0].personas_id,
        domicilios_id: cast[0].domicilios_id,
      });

      this.ciudades.push({ id: cast[0].ciudades_id, descrip: cast[0].ciudad_nombre.trim() });
 
    });
  }

  obtenerProvincias() {
    //Llenado de combo provincias
    this.SrvDomicilios.getProvinciasPorPais(1).subscribe(respuesta => {
      console.log({ 'SrvDomicilios.getProvinciasPorPais': respuesta });
      let cast: any = respuesta;
      for (let i = 0; i < cast.length; i++) {
        this.provincias.push({ 'id': cast[i].id, 'nombre': cast[i].nombre });
      }
      
    }, error => {
      console.error(`Ocurrio un error al obtener las provincias. ${error.message}`);
    }, ()=> {
      this.clientesForm.controls.provincia.setValue(23);
      this.getCiudadesPorProvincia();
    });
  }

  getCiudadesPorProvincia() {
    let provincias_id = this.clientesForm.controls.provincia.value;
    this.SrvDomicilios.getCiudadesPorProvincia(provincias_id).subscribe(respuesta => {
      let cast: any = respuesta;
      console.log({ 'SrvDomicilios.getCiudadesPorProvincia': cast });
      for (let i = 0; i < cast.length; i++) {
        this.ciudades.push({ id: cast[i].id, descrip: cast[i].nombre.trim() });
        //por alguna razon el nombre viene con espacios en blanco alrededor asi que se hace un trim por javascript
      }
    })
  }


  guardarCliente() {
    let id_cliente = this.clientesForm.controls.clientes_id.value;
    console.log({ 'Form Valido': this.clientesForm.valid });
    console.log(JSON.stringify(this.clientesForm.getRawValue()));
    if (this.clientesForm.valid) {
      //let ciudad_nombre = this.clientesForm.get('ciudades').value.descrip;
      let ciudad_nombre = (<HTMLInputElement>document.getElementById("ciudades")).value;
      if (id_cliente != null || id_cliente != undefined) {
        console.log('Modificar...');
        this.SrvDomicilios.getCiudadesIdPorNombre(ciudad_nombre).subscribe(respuesta => {
          console.log({ "SrvDomicilios.getCiudadesIdPorNombre": respuesta });
          let cast: any = respuesta;
          this.clientesForm.controls.ciudades_id.setValue(cast.id);
          console.log(JSON.stringify(this.clientesForm.getRawValue()));
        }, err => {
          alert("Debe seleccionar una ciudad de la lista desplegable."); console.log(err)
        }, () => {
          this.SrvClientes.guardarClientePersonaDomicilio(this.clientesForm.getRawValue()).subscribe(resp => {
            console.log('MODIFICADO');
            this.clientesForm.reset();
            this.router.navigate(['clientes/busqueda-clientes']);
          });
        });
      }
      else {
        console.log('Insertar...');
        this.SrvDomicilios.getCiudadesIdPorNombre(ciudad_nombre).subscribe(respuesta => {
          console.log({ "SrvDomicilios.getCiudadesIdPorNombre": respuesta });
          let cast: any = respuesta;
          this.clientesForm.controls.ciudades_id.setValue(cast.id);
        }
          , err => { console.log(err) }
          , () => {
            this.SrvClientes.guardarClientePersonaDomicilio(this.clientesForm.getRawValue()).subscribe(resp => {
              console.log('INSERTADO');
              this.clientesForm.reset();
              this.router.navigate(['clientes/busqueda-clientes']);
            });
          });
      }
    }
    else {
      console.log({ "Submit Invalido": this.clientesForm.controls });
    }
  }

}


interface Tabgral {
  codigo: string;
  descrip: string;
}

