import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.component.html',
  styleUrls: ['./buscar-usuarios.component.css']
})
export class BuscarUsuariosComponent implements OnInit {



  buscarUsuariosForm: FormGroup;
  cast: any;


  constructor(private SrvUsuarios: UsuariosService,
    private SrvToastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.buscarUsuariosForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ], 
      txtBuscar: []
    });
  }

  ngOnInit() {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    let busqueda = this.buscarUsuariosForm.controls.txtBuscar.value;
    if (busqueda == undefined || busqueda == '') {
      this.SrvUsuarios.getUsuariosTodos().subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvUsuarios.getUsuariosTodos": this.cast });
      });
    }
    else {
      this.SrvUsuarios.getUsuariosBusqueda(busqueda).subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvUsuarios.getUsuariosBusqueda": this.cast });
      });
    }
  }





}
