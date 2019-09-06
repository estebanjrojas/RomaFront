import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../../../servicios/categorias.service';
import { Categorias } from '../../../modelos/Categorias';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-cargar-categoria',
  templateUrl: './cargar-categoria.component.html',
  styleUrls: ['./cargar-categoria.component.css']
})
export class CargarCategoriaComponent implements OnInit {
    //Arbol de Categorias
    treeControl = new NestedTreeControl<Categorias>(node => node.children);
    dataSource = new MatTreeNestedDataSource<Categorias>();
  //Instancias
  categoriasForm: FormGroup;

  constructor(private formBuilder: FormBuilder
            , private SrvToastr: ToastrService
            , private SrvCategorias: CategoriasService) {
    this.categoriasForm = this.formBuilder.group({
      nombre: [
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
          Validators.required
        ])
      ],
      categorias_padre_id: [
        '', Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  hasChild = (_: number, node: Categorias) => !!node.children && node.children.length > 0;

  ngOnInit() {

    this.SrvCategorias.obtenerJSONTodasCategorias().subscribe(resp => {
      console.log({ "SrvCategorias.obtenerJSONTodasCategorias": resp });
      let cast: any = resp;
      this.SrvCategorias.setCategorias(JSON.parse(cast.categorias));
    });

    this.llenarArbolCategorias();

  }

  llenarArbolCategorias() {
    const categoriasObservable = this.SrvCategorias.getCategorias();
    categoriasObservable.subscribe((categoriasData: Categorias[]) => {
      console.log(categoriasData);
      this.dataSource.data = categoriasData;
    }, err => { console.error('Error al obtener categorias: ' + err); }
      , () => {
      });
  }

  seleccionarCategoriaPadre(padres_id) {
    this.categoriasForm.controls.categorias_padre_id.setValue(padres_id);

    console.log('categoria padre: '+this.categoriasForm.get('categorias_padre_id').value);
  }

  guardar() {
    console.log(this.categoriasForm.controls);

    const nombre = this.categoriasForm.get('nombre').value;
    const descripcion = this.categoriasForm.get('descripcion').value;
    const categoria_padre = this.categoriasForm.get('categorias_padre_id').value;


    const categoria : CategoriaGuardar = {'nombre' : nombre, 'descripcion':descripcion, 'categorias_padre_id':categoria_padre};
   
    this.SrvCategorias.guardarCategoria(categoria).subscribe(resp => {
      console.log({"SrvCategorias.guardarCategoria": resp});
      this.SrvToastr.success('Categorias guardada exitosamente');
      this.categoriasForm.reset();
      this.llenarArbolCategorias();
    });
  }

}


interface CategoriaGuardar {
  id ?: number;
  nombre ?: string;
  descripcion ?: string;
  categorias_padre_id ?: number;

}