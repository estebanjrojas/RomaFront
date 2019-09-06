import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../../servicios/categorias.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-buscar-categoria',
  templateUrl: './buscar-categoria.component.html',
  styleUrls: ['./buscar-categoria.component.css']
})
export class BuscarCategoriaComponent implements OnInit {

  buscarCategoriasForm: FormGroup;
  cast: any;


  constructor(private SrvCategorias: CategoriasService,
    private SrvToastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.buscarCategoriasForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],
      txtBuscar: []
    });
  }

  ngOnInit() {
    this.buscarCategorias();
  }


  buscarCategorias() {
    let busqueda = this.buscarCategoriasForm.controls.txtBuscar.value;
    if (busqueda == undefined || busqueda == '') {
      this.SrvCategorias.getCategoriasTodas().subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvCategorias.getCategoriasTodas": this.cast });
      });
    }
    else {
      this.SrvCategorias.getCategoriasBusqueda(busqueda).subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvCategorias.getCategoriasBusqueda": this.cast });
      });
    }
  }

}
