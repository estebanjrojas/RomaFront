import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TabgralService } from "../../../../../../comunes/servicios/tabgral.service";
import { ProductosService } from "../../../../../../comunes/servicios/productos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";

export interface ProductosInterface {
  descrip: string;
  id: number;
}

@Component({
  selector: "app-cargar-promociones",
  templateUrl: "./cargar-promociones.component.html",
  styleUrls: ["./cargar-promociones.component.scss"],
})
export class CargarPromocionesComponent implements OnInit {
  //Variables
  submitted: boolean = false;
  nomb_usr: string;

  //Instancias
  promocionesForm: FormGroup;
  productos: ProductosInterface[] = [];
  filteredOptions: Observable<ProductosInterface[]>;
  caracteristicas = new Array<Caracteristica>();
  restricciones = new Array<Restricciones>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SrvTabgral: TabgralService,
    private SrvProductos: ProductosService
  ) {
    this.promocionesForm = this.formBuilder.group({
      nombre_promocion: ["", Validators.compose([Validators.required])],
      descripcion_promocion: ["", Validators.compose([Validators.required])],
      fecha_desde: ["", Validators.compose([Validators.required])],
      fecha_hasta: ["", Validators.compose([Validators.required])],
      producto: ["", Validators.compose([Validators.required])],
      tipo: ["", Validators.compose([])],
      valor: ["", Validators.compose([])],
      unidad: ["", Validators.compose([])],
      nombre_usuario: ["", Validators.compose([])],
      id_promociones: ["", Validators.compose([])],
    });
  }

  //----------- Inicio NgOnInit ----------//
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.promocionesForm.controls.id_promociones.setValue(
        params.promociones_id
      );
      console.log(params);
    });

    this.filteredOptions =
      this.promocionesForm.controls.producto.valueChanges.pipe(
        startWith<string | ProductosInterface>(""),
        map((value) => (typeof value === "string" ? value : value.descrip)),
        map((descrip) =>
          descrip ? this._filter(descrip) : this.productos.slice()
        )
      );

    this.getProductosCombo();
  }
  //----------- FIN NgOnInit ----------//

  //INICIO autocompletar en select
  displayFn(user?: ProductosInterface): string | undefined {
    return user ? user.descrip : undefined;
  }

  private _filter(descrip: string): ProductosInterface[] {
    const filterValue = descrip.toLowerCase();

    return this.productos.filter(
      (option) => option.descrip.toLowerCase().indexOf(filterValue) === 0
    );
  }
  //FIN autocompletar en select

  //Funciones utiles para manejo de datos de tablas
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 == c2 : false;
  }

  /*borrarFila(value) {
    var array = this.caracteristicas;
    array.splice(value, 1);
  }*/

  borrarFila(value, array) {
    array.splice(value, 1);
  }
  //FIN - Funciones utiles para manejo de datos de tablas

  getProductosCombo() {
    this.SrvProductos.getProductosTodos().subscribe((respuesta) => {
      let cast: any = respuesta;
      console.log({ "SrvProductos.getProductosTodos": cast });
      for (let i = 0; i < cast.length; i++) {
        this.productos.push({ descrip: cast[i].nombre.trim(), id: cast[i].id });
      }
      console.log(this.productos);
    });
  }

  agregarDatosTablaProductos() {
    let producto_id = this.promocionesForm.get("producto").value.id;
    let producto_nombre = this.promocionesForm.get("producto").value.descrip;

    this.caracteristicas.push({ nombre: producto_nombre });
    //this.promocionesForm.controls.producto.reset();
  }

  agregarDatosTablaRestricciones() {
    var _tipo = this.promocionesForm.controls.tipo.value;
    var _valor = this.promocionesForm.controls.valor.value;
    var _unidad = this.promocionesForm.controls.unidad.value;

    if (
      _tipo != null &&
      _valor.length != 0 &&
      _unidad != 0 &&
      _unidad != undefined
    ) {
      this.restricciones.push({ tipo: _tipo, valor: _valor, unidad: _unidad });
      this.promocionesForm.controls.tipo.reset();
      this.promocionesForm.controls.valor.reset();
      this.promocionesForm.controls.unidad.reset();
    } else {
      alert("Todos los campos son obligatorios...");
      document.getElementById("tipo").focus();
    }
  }
  guardar() {
    //do something
  }
}

interface Caracteristica {
  nombre: Text;
}

interface Restricciones {
  tipo: string;
  valor: string;
  unidad: string;
}

interface Tabgral {
  codigo: string;
  descrip: string;
}
