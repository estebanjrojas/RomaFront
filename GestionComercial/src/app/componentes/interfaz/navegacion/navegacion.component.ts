import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService} from '../../../servicios/usuarios.service';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  datos_usuario: any;
  menuArray: any = [];

  constructor(private router: Router, private SrvUsuarios: UsuariosService, private Auth: AuthService) { }

  ngOnInit() {
    let usuario = this.Auth.getNombreUsuarioSesion();
    let menuLS = this.Auth.getMenuUsuarioSesion();
    this.menuArray = JSON.parse(menuLS).menu;

    this.SrvUsuarios.getDatosUsuario(usuario).subscribe(respuesta=>{
      let cast = respuesta;
      this.datos_usuario = cast[0];
      console.log(this.datos_usuario);
      this.Auth.setDebug(this.datos_usuario.debug);
      
      if(this.Auth.getDebugUsuarioSesion()==1) {
        console.log({"SrvUsuarios.getDatosUsuario": this.datos_usuario});
      }
    });

  }

  cerrarSession(){
    localStorage.clear();
    this.Auth.setUsuarioSesion('', '', 0, '');
    this.router.navigate(['']);

  }

}
