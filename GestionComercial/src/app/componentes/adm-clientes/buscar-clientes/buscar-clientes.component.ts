import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../servicios/clientes.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscar-clientes',
  templateUrl: './buscar-clientes.component.html',
  styleUrls: ['./buscar-clientes.component.css']
})
export class BuscarClientesComponent implements OnInit {

  buscarClientesForm: FormGroup;
  cast: any;


  constructor(private SrvClientes: ClientesService,
    private SrvToastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.buscarClientesForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],
      txtBuscar: []
    });
  }

  ngOnInit() {
    this.buscarClientes();
  }


  buscarClientes() {
    let busqueda = this.buscarClientesForm.controls.txtBuscar.value;
    if (busqueda == undefined || busqueda == '') {
      this.SrvClientes.getClientesTodos().subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvCategorias.getClientesTodos": this.cast });
      });
    }
    else {
      this.SrvClientes.getClientesBusqueda(busqueda).subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvCategorias.getClientesBusqueda": this.cast });
      });
    }
  }

}