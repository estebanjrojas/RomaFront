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
//import { Empleados } from '../../../modelos/Clientes';
import { Provincias } from '../../../modelos/Provincias';
import { ActivatedRoute } from '@angular/router';

export interface CiudadesInterface {
  descrip: string;
}

@Component({
  selector: 'app-cargar-clientes',
  templateUrl: './cargar-clientes.component.html',
  styleUrls: ['./cargar-clientes.component.css']
})
export class CargarClientesComponent implements OnInit {
  //miEmpleado : Empleados;
  provincias: Provincias[] = [];
  oficinas: any;
  clientesForm: FormGroup;

  ciudades: CiudadesInterface[] = [];
  ciudadesClass: Ciudades = new Ciudades();


  filteredOptions: Observable<CiudadesInterface[]>;

  constructor(private SrvTabgral: TabgralService
    , private SrvClientes: ClientesService
    , private SrvPersonas: PersonasService
    , private SrvDomicilios: DomiciliosService
    , private toastr: ToastrService
    , private formBuilder: FormBuilder
    , private route: ActivatedRoute) {

    this.clientesForm = this.formBuilder.group({
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
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],
      tipo_doc: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      sexo: [
        '', Validators.compose([
          Validators.required
        ])
      ],
      telefono: [
        '', Validators.compose([
        ])
      ],
      celular: [
        '', Validators.compose([
        ])
      ],
      email: [
        '', Validators.compose([
        ])
      ],
      clientes_id: [
        '', Validators.compose([
        ])
      ]

    });

  }


  getCiudadesPorProvincia() {
    let provincias_id = this.clientesForm.controls.provincia.value;
    this.SrvDomicilios.getCiudadesPorProvincia(provincias_id).subscribe(respuesta => {
      let cast: any = respuesta;
      console.log({ 'SrvDomicilios.getCiudadesPorProvincia': cast });
      for (let i = 0; i < cast.length; i++) {
        this.ciudades.push({ descrip: cast[i].nombre.trim() });
        //por alguna razon el nombre viene con espacios en blanco alrededor asi que se hace un trim por javascript
      }
      console.log(this.ciudades);
    })
  }




  ngOnInit() {

    this.clientesForm.controls.tipo_doc.setValue("3");

    this.route.params.subscribe(params => {
      this.clientesForm.controls.clientes_id.setValue(params.clientes_id);
      console.log(params);
    });

    this.route.params.subscribe(params => {
      if (params.clientes_id != null) {
        this.clientesForm.controls.clientes_id.setValue(params.clientes_id);
        this.SrvClientes.getDatosClientePorId(params.clientes_id).subscribe(respuesta => {
          console.log({ "SrvClientes.getDatosClientePorId": respuesta });
          let cast: any = respuesta;
          //Datos personales
          this.clientesForm.controls.apellido.setValue(cast[0].apellido);
          this.clientesForm.controls.nombre.setValue(cast[0].nombre);
          this.clientesForm.controls.documento.setValue(cast[0].nro_doc);
          this.clientesForm.controls.tipo_doc.setValue(cast[0].tipo_doc + "");
          this.clientesForm.controls.fecha_nacimiento.setValue(cast[0].fecha_nac);
          this.clientesForm.controls.sexo.setValue(cast[0].sexo + "");
          this.clientesForm.controls.telefono.setValue(cast[0].telefono);
          this.clientesForm.controls.celular.setValue(cast[0].telefono_cel);
          this.clientesForm.controls.email.setValue(cast[0].email);

          //Domicilio
          /* this.SrvDomicilios.getDomicilioByNroDoc(cast[0].nro_doc).subscribe(respuesta2 => {
             console.log({'SrvDomicilios.getDomicilioByNroDoc' : respuesta2});
             let cast2 : any = respuesta[0];
             if(cast2) {
               this.empleadosForm.controls.calle.setValue(cast2.calle);
               this.empleadosForm.controls.numero.setValue(cast2.numero);
               this.empleadosForm.controls.piso.setValue(cast2.piso);
               this.empleadosForm.controls.depto.setValue(cast2.depto);
               this.empleadosForm.controls.manzana.setValue(cast2.manzana);
               this.empleadosForm.controls.provincia.setValue(cast2.provincias_id+"");
               this.empleadosForm.controls.ciudades.setValue(cast2.ciudad_nombre);
             }       
           });*/
        });
      }
      console.log(params);
    });


    //Llenado de combo provincias
    this.SrvDomicilios.getProvinciasPorPais(1).subscribe(respuesta => {
      console.log({ 'SrvDomicilios.getProvinciasPorPais': respuesta });
      let cast: any = respuesta;
      for (let i = 0; i < cast.length; i++) {
        this.provincias.push({ 'id': cast[i].id, 'nombre': cast[i].nombre });
      }

      this.clientesForm.controls.provincia.setValue(23);
      this.getCiudadesPorProvincia();
    });

    //Tabgral
    this.SrvTabgral.selectByNroTab(3).subscribe(respuesta => {
      console.log({ 'SrvTabgral.selectByNroTab': respuesta });
      this.oficinas = respuesta;
    })

    //Filtro de ciudades por provincia
    this.filteredOptions = this.clientesForm.controls.ciudades.valueChanges
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

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 == c2 : false;
  }


  guardarCliente() {
    let id_cliente = this.clientesForm.get('clientes_id').value;
    console.log({ 'Form Valido': this.clientesForm.valid });
    if (this.clientesForm.valid) {
      let ciudades_id = 0;
      let ciudad_nombre = this.clientesForm.get('ciudades').value.descrip;
      if (id_cliente == undefined || id_cliente == null) {
        console.log('Insertar...');
        this.SrvDomicilios.getCiudadesIdPorNombre(ciudad_nombre).subscribe(respuesta => {
          console.log({ "SrvDomicilios.getCiudadesIdPorNombre": respuesta });
          let cast: any = respuesta;
          ciudades_id = cast.id;
        }
          , err => { console.log(err) }
          , () => {
            let campos_domicilio = {
              "ciudades_id": ciudades_id,
              "calle": ((this.clientesForm.get('calle') != undefined) ? this.clientesForm.get('calle').value : ""),
              "numero": ((this.clientesForm.get('numero') != undefined) ? this.clientesForm.get('numero').value : ""),
              "piso": ((this.clientesForm.get('piso') != undefined) ? this.clientesForm.get('piso').value : ""),
              "depto": ((this.clientesForm.get('depto') != undefined) ? this.clientesForm.get('depto').value : ""),
              "manzana": ((this.clientesForm.get('manzana') != undefined) ? this.clientesForm.get('manzana').value : ""),
              "lote": ((this.clientesForm.get('lote') != undefined) ? this.clientesForm.get('lote').value : ""),
              "block": ((this.clientesForm.get('block') != undefined) ? this.clientesForm.get('block').value : ""),
              "barrio": ((this.clientesForm.get('barrio') != undefined) ? this.clientesForm.get('barrio').value : "")
            };

            let insert_completo = {
              domicilio: campos_domicilio,
              //Persona
              "tipo_doc": this.clientesForm.get('tipo_doc').value,
              "nro_doc": this.clientesForm.get('documento').value,
              "apellido": this.clientesForm.get('apellido').value,
              "nombre": this.clientesForm.get('nombre').value,
              "telefono": this.clientesForm.get('telefono').value,
              "celular": this.clientesForm.get('celular').value,
              "email": this.clientesForm.get('email').value,
              "fecha_nac": this.clientesForm.get('fecha_nacimiento').value,
              "sexo": this.clientesForm.get('sexo').value,
            }
            console.log({ "Insertar": insert_completo });
            this.SrvClientes.insertClientePersonaDomicilio(insert_completo).subscribe(resp => {
              console.log('INSERTADO');
              this.clientesForm.reset();
            });



          });




      }
      else { console.log('Modificar...'); }

    }
    else {
      console.log({ "Submit Invalido": this.clientesForm.controls });
    }
  }

}