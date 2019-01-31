import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService} from '../../servicios/usuarios.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  usuario: string = localStorage.getItem('roma_usuario');
  datos_usuario: any;

  constructor(private router: Router, private SrvUsuarios: UsuariosService) { }

  ngOnInit() {
    this.SrvUsuarios.getDatosUsuario(this.usuario).subscribe(respuesta=>{
      this.datos_usuario = respuesta;
      localStorage.setItem('roma_debug', ((this.datos_usuario.debug!=undefined)? this.datos_usuario.debug : '0'));
      if(localStorage.getItem('roma_debug')=='1') {
        console.log({"SrvUsuarios.getDatosUsuario": this.datos_usuario});
      }
    });

  }

  cerraSession(){
    localStorage.clear();
    this.router.navigate(['']);

  }

}
