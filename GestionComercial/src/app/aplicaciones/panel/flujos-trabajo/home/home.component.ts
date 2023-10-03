import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../comunes/servicios/auth.service";
import { UsuariosService } from "../../../../comunes/servicios/usuarios.service";
import { ProductosService } from "../../../../comunes/servicios/productos.service";
import {
  faChartArea,
  faProjectDiagram,
  faFileInvoice,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { DatePipe } from "@angular/common";
//import * as tf from '@tensorflow/tfjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  faChartArea = faChartArea;
  faProjectDiagram = faProjectDiagram;
  faFileInvoice = faFileInvoice;
  faUserCog = faUserCog;
  datos_usuario: any = {};
  novedades_productos: {}[] = [];

  //modelo: tf.LayersModel;

  constructor(
    private Auth: AuthService,
    private SrvUsuarios: UsuariosService,
    private SrvProductos: ProductosService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.novedades_productos = [];
    let usuario = this.Auth.getNombreUsuarioSesion();
    this.SrvUsuarios.getDatosUsuario(usuario).subscribe((respuesta) => {
      let cast = respuesta;
      this.datos_usuario = cast[0];
    });

    this.SrvProductos.getNovedadesProductos(
      "2019-06-01",
      this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      5
    ).subscribe((respuesta) => {
      let cast: any = respuesta;
      for (let i = 0; i < cast.length; i++) {
        this.novedades_productos.push({
          id: cast[i]._id,
          fecha: cast[i]._fecha,
          tipo: cast[i]._tipo,
          tipo_codigo: cast[i]._tipo_codigo,
          descripcion: cast[i]._descripcion,
        });
      }
    });

    // tf.loadLayersModel("ruta/al/modelo/model.json").then((modelo) => {
    //   this.modelo = modelo;
    // });
  }

  realizarPrediccion(datos: any): void {
    // Preprocesar los datos de entrada según sea necesario
    // Realizar la predicción utilizando el modelo cargado
    //const predicciones = this.modelo.predict(datos);
    // Procesar los resultados de las predicciones
    // ...
    // Hacer lo que necesites con las predicciones
    // ...
  }
}
