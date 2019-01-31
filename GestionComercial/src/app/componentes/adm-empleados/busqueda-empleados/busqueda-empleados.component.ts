import { Component, OnInit } from '@angular/core';
import { EmpleadosService} from '../../../servicios/empleados.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-busqueda-empleados',
  templateUrl: './busqueda-empleados.component.html',
  styleUrls: ['./busqueda-empleados.component.css']
})
export class BusquedaEmpleadosComponent implements OnInit {

  empleadosForm: FormGroup;
  cast: any;

  constructor(private SrvEmpleados: EmpleadosService
    , private SrvToastr: ToastrService
    , private formBuilder: FormBuilder) {

      this.empleadosForm = this.formBuilder.group({
        txtBuscar: []
      })
     }

  ngOnInit() {
  }

  buscarEmpleado() {
    let busqueda = this.empleadosForm.controls.txtBuscar.value;
    if(busqueda==undefined || busqueda=='') {
      this.SrvEmpleados.getEmpleadosTodos().subscribe(respuesta => {
        this.cast = respuesta;
        console.log({"SrvEmpleados.getEmpleadosTodos" : this.cast});   
      });
    }
    else {
      this.SrvEmpleados.getEmpleadosBusqueda(busqueda).subscribe(respuesta => {
        this.cast = respuesta;
        console.log({"SrvEmpleados.getEmpleadosBusqueda" : this.cast});   
      });
    }
  }


  actualizarEmpleado(empleados_id) {
    console.log("Actualizar: "+empleados_id);
  }

  eliminarEmpleado(empleados_id) {
    console.log(" Baja de Empleado: "+empleados_id);
  }

}
