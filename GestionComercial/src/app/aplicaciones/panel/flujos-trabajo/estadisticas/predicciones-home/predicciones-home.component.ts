import { Component, OnInit } from "@angular/core";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { PrediccionesService } from "src/app/comunes/servicios/predicciones.service";

@Component({
  selector: "app-predicciones-home",
  templateUrl: "./predicciones-home.component.html",
  styleUrls: ["./predicciones-home.component.scss"],
})
export class PrediccionesHomeComponent implements OnInit {
  faProjectDiagram = faProjectDiagram;

  ngOnInit() {}

  selectedFile: File | undefined;

  constructor(
    private http: HttpClient,
    private srvPredicciones: PrediccionesService
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onFileSubmit() {
    if (this.selectedFile) {
      this.srvPredicciones
        .parseCSV(this.selectedFile)
        .subscribe((respuesta) => {
          console.log({ "srvPredicciones.parseCSV": respuesta });
        });

      // Enviar el archivo al servidor para su procesamiento (puedes ajustar la URL según tu configuración)
      // this.http
      //   .post(environment.apiEndpoint + "/getCSVParseado", formData)
      //   .subscribe(
      //     (response) => {
      //       // Manejar la respuesta del servidor (por ejemplo, mostrar resultados)
      //       console.log("Respuesta del servidor:", response);
      //     },
      //     (error) => {
      //       // Manejar errores
      //       console.error("Error al cargar el archivo:", error);
      //     }
      //   );
    }
  }
}
