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
  empleados: any = [];

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
    let busqueda = this.empleadosForm.get('txtBuscar').value;
    if(busqueda==undefined || busqueda=='' || busqueda==null) {
      this.SrvEmpleados.getEmpleadosTodos().subscribe(respuesta => {
        this.empleados = respuesta;
        this.SrvToastr.success('Have fun storming the castle!', 'Miracle Max Says');
        console.log({"SrvEmpleados.getEmpleadosTodos" : respuesta });   
      });
    }
    else {
      this.SrvEmpleados.getEmpleadosBusqueda(busqueda).subscribe(respuesta => {
        this.empleados = respuesta;
        console.log({"SrvEmpleados.getEmpleadosBusqueda" : respuesta});   
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
