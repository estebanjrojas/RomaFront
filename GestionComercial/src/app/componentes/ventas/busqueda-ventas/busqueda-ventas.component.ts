import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VentasService } from '../../../servicios/ventas.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-busqueda-ventas',
  templateUrl: './busqueda-ventas.component.html',
  styleUrls: ['./busqueda-ventas.component.css']
})
export class BusquedaVentasComponent implements OnInit {

  busquedaVentasForm: FormGroup;
  cast: any;

  constructor(private SrvVentas: VentasService,
    private SrvToastr: ToastrService,
    private formBuilder: FormBuilder) { 
   
    this.busquedaVentasForm = this.formBuilder.group({
      nombre_usuario: [
        '', Validators.compose([

        ])
      ],
      txtBuscar: []
    });


  }

  ngOnInit() {
    this.buscarVentas();
  }


  buscarVentas() {
    let busqueda = this.busquedaVentasForm.controls.txtBuscar.value;
    if (busqueda == undefined || busqueda == '') {
      this.SrvVentas.getVentasTodas().subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvVentas.getVentasTodas": this.cast });
      });
    }
    else {
      this.SrvVentas.getVentasBusqueda(busqueda).subscribe(respuesta => {
        this.cast = respuesta;
        console.log({ "SrvVentas.getVentasBusqueda": this.cast });
      });
    }
  }

  anularVenta(ventas_id) {
    const usuario_anula = localStorage.getItem('roma_usuario');
    let autoriza = confirm("Está seguro que desea anular la venta?");
    if(autoriza) {
      const data = {"ventas_id" : ventas_id, "usuario" : usuario_anula};
      this.SrvVentas.anularVenta(data).subscribe(res => {
        console.log(res);
        this.buscarVentas();
      });
    }
  }


}
