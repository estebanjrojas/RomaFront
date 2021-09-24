import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { UsuariosService} from '../../servicios/usuarios.service';
import { ProductosService } from '../../servicios/productos.service';
import { faChartArea, faProjectDiagram, faFileInvoice, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faChartArea = faChartArea;
  faProjectDiagram = faProjectDiagram;
  faFileInvoice = faFileInvoice;
  faUserCog = faUserCog;
  datos_usuario = [];
  novedades_productos = [];
    constructor(private Auth: AuthService, private SrvUsuarios: UsuariosService, private SrvProductos: ProductosService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.novedades_productos = [];
    let usuario = this.Auth.getNombreUsuarioSesion();
    this.SrvUsuarios.getDatosUsuario(usuario).subscribe(respuesta=>{
      let cast = respuesta;
      this.datos_usuario = cast[0];
      console.log(this.datos_usuario);
      
      if(this.Auth.getDebugUsuarioSesion()==1) {
        console.log({"SrvUsuarios.getDatosUsuario": this.datos_usuario});
      }
    });

    this.SrvProductos.getNovedadesProductos('2019-06-01', this.datePipe.transform(new Date(), 'yyyy-MM-dd'), 5).subscribe(respuesta => {
      let cast : any = respuesta;
      for(let i = 0; i<cast.length; i++){
        this.novedades_productos.push({
          "id" : cast[i]._id,
          "fecha" : cast[i]._fecha,
          "tipo" : cast[i]._tipo,
          "tipo_codigo" : cast[i]._tipo_codigo,
          "descripcion" : cast[i]._descripcion
        })
      }
    })
  }


}
