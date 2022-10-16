import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { SnackBarService } from "src/app/core/ui/comunes/servicios/SnackBarService";
import { CategoriasService } from "../../../../../../comunes/servicios/categorias.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cargar-categoria",
  templateUrl: "./cargar-categoria.component.html",
  styleUrls: ["./cargar-categoria.component.scss"],
})
export class CargarCategoriaComponent implements OnInit {
  //Arbol de Categorias
  listaCategorias = [];
  objetosArbolCategorias = [];

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

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.categorias_id = params.categorias_id;
      if (params.categorias_id != null) {
        this.getDatosCategorias(params.categorias_id);
        this.categoriasForm.controls.id_categorias.setValue(
          params.categorias_id
        );
      }
    });

    this.SrvCategorias.obtenerJSONTodasCategorias().subscribe(
      (resp) => {
        let cast: any = resp;
        this.SrvCategorias.setCategorias(JSON.parse(cast.categorias));
      },
      (error) => {
        console.error(`Ha ocurrido un error: ${error}`);
      },
      () => {
        this.llenarArbolCategorias();
      }
    );
  }

  getDatosCategorias(categorias_id: any) {
    this.SrvCategorias.getDatosCategorias(categorias_id).subscribe(
      (respuesta) => {
        let cast: any = respuesta;

        this.categoriasForm.controls.nombre.setValue(cast[0].nombre);
        this.categoriasForm.controls.descripcion.setValue(cast[0].descripcion);
        this.categoriasForm.controls.categorias_padre_id.setValue(
          cast[0].categorias_id_padre
        );
      },
      (err) => {
        console.error({ ERROR: err });
      }
    );
  }

  llenarArbolCategorias() {
    let categoriasData: any[] = this.SrvCategorias.getCategorias();
    this.objetosArbolCategorias = categoriasData;
  }

  actualizarCategoriaPadre(event) {
    this.categoriasForm.controls.categorias_padre_id.setValue(event.id);
  }

  guardar() {
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
        this.snackBar.mostrarMensaje("Categorias guardada exitosamente");
        this.categoriasForm.reset();
        this.llenarArbolCategorias();
      });
    } else {
      //UPDATE
      this.SrvCategorias.updateCategoria(categoria).subscribe(
        () => {
          this.snackBar.mostrarMensaje("Categoria actualizada exitosamente");
        },
        (err) => {
          console.error({ ERROR: err });
          alert("Ha ocurrido un error... ");
        },
        () => {
          this.categoriasForm.reset();
          this.router.navigate(["/panel/categorias/busqueda-categorias"]);
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
