import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { SnackBarService } from "src/app/core/ui/comunes/servicios/SnackBarService";
import { CategoriasService } from "../../../../../../comunes/servicios/categorias.service";
import { Categorias } from "../../../../../../comunes/interfaces/Categorias";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cargar-categoria",
  templateUrl: "./cargar-categoria.component.html",
  styleUrls: ["./cargar-categoria.component.scss"],
})
export class CargarCategoriaComponent implements OnInit {
  //Arbol de Categorias
  treeControl = new NestedTreeControl<Categorias>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Categorias>();
  //Instancias
  categoriasForm: FormGroup;
  categorias_id: number;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackBarService,
    private router: Router,
    private SrvCategorias: CategoriasService,
    private route: ActivatedRoute
  ) {
    this.categoriasForm = this.formBuilder.group({
      id_categorias: [""],
      nombre: ["", Validators.compose([Validators.required])],
      descripcion: ["", Validators.compose([Validators.required])],
      nombre_usuario: ["", Validators.compose([Validators.required])],
      categorias_padre_id: ["", Validators.compose([Validators.required])],
    });
  }

  hasChild = (_: number, node: Categorias) =>
    !!node.children && node.children.length > 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {});

    this.route.params.subscribe((params) => {
      this.categorias_id = params.categorias_id;
      if (params.categorias_id != null) {
        this.getDatosCategorias(params.categorias_id);
        this.categoriasForm.controls.id_categorias.setValue(
          params.categorias_id
        );
      }
      console.log({ "PARAMS: ": params });
    });

    this.SrvCategorias.obtenerJSONTodasCategorias().subscribe((resp) => {
      console.log({ "SrvCategorias.obtenerJSONTodasCategorias": resp });
      let cast: any = resp;
      this.SrvCategorias.setCategorias(JSON.parse(cast.categorias));
    });

    this.llenarArbolCategorias();
  }

  getDatosCategorias(categorias_id: any) {
    this.SrvCategorias.getDatosCategorias(categorias_id).subscribe(
      (respuesta) => {
        console.log({ "SrvCategorias.getDatosCategorias()": respuesta });
        let cast: any = respuesta;

        this.categoriasForm.controls.nombre.setValue(cast[0].nombre);
        this.categoriasForm.controls.descripcion.setValue(cast[0].descripcion);
        this.categoriasForm.controls.categorias_padre_id.setValue(
          cast[0].categorias_id_padre
        );
      },
      (err) => {
        console.log({ ERROR: err });
        alert("Ha ocurrido un error... ");
      }
    );
  }

  llenarArbolCategorias() {
    const categoriasObservable = this.SrvCategorias.getCategorias();
    categoriasObservable.subscribe(
      (categoriasData: Categorias[]) => {
        console.log(categoriasData);
        this.dataSource.data = categoriasData;
      },
      (err) => {
        console.error("Error al obtener categorias: " + err);
      },
      () => {}
    );
  }

  seleccionarCategoriaPadre(padres_id) {
    this.categoriasForm.controls.categorias_padre_id.setValue(padres_id);

    console.log(
      "categoria padre: " + this.categoriasForm.get("categorias_padre_id").value
    );
  }

  guardar() {
    console.log(this.categoriasForm.controls);

    const id_categoria = this.categoriasForm.get("id_categorias").value;
    const nombre = this.categoriasForm.get("nombre").value;
    const descripcion = this.categoriasForm.get("descripcion").value;
    const categoria_padre = this.categoriasForm.get(
      "categorias_padre_id"
    ).value;

    const categoria: CategoriaGuardar = {
      id: id_categoria,
      nombre: nombre,
      descripcion: descripcion,
      categorias_padre_id: categoria_padre,
    };

    if (this.categorias_id == null) {
      this.SrvCategorias.guardarCategoria(categoria).subscribe((resp) => {
        console.log({ "SrvCategorias.guardarCategoria": resp });
        this.snackBar.mostrarMensaje("Categorias guardada exitosamente");
        this.categoriasForm.reset();
        this.llenarArbolCategorias();
      });
    } else {
      //UPDATE
      this.SrvCategorias.updateCategoria(categoria).subscribe(
        (resp) => {
          console.log({ "SrvCategorias.updateCategoria": resp });
          this.snackBar.mostrarMensaje("Categoria actualizada exitosamente");
        },
        (err) => {
          console.error({ ERROR: err });
          alert("Ha ocurrido un error... ");
        },
        () => {
          this.categoriasForm.reset();
          this.router.navigate(["categorias/busqueda-categorias"]);
        }
      );
    }
  }
}

interface CategoriaGuardar {
  id?: number;
  nombre?: string;
  descripcion?: string;
  categorias_padre_id?: number;
}
