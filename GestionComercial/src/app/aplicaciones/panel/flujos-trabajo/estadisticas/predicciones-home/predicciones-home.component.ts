import { Component, OnInit } from "@angular/core";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { PrediccionesService } from "src/app/comunes/servicios/predicciones.service";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: "app-predicciones-home",
  templateUrl: "./predicciones-home.component.html",
  styleUrls: ["./predicciones-home.component.scss"],
})
export class PrediccionesHomeComponent implements OnInit {
  faProjectDiagram = faProjectDiagram;
  arrayDatosCSV: any = [];

  valX: number[] = [1, 2, 3, 4, 5, 6, 7];
  valY: any[];
  disabledBtnCalcular: boolean = true;

  ngOnInit() {}

  selectedFile: File | undefined;

  constructor(
    private http: HttpClient,
    private srvPredicciones: PrediccionesService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onFileSubmit() {
    if (this.selectedFile) {
      this.srvPredicciones.parseCSV(this.selectedFile).subscribe(
        (respuesta) => {
          console.log({ "srvPredicciones.parseCSV": respuesta });
          let cast: any = respuesta;

          this.arrayDatosCSV = cast;
        },
        (err) => {
          console.log({ ERR: err });
          this.mostrarMensajeError("Hay un error con el CSV o no se cargó... ");
        },
        () => {
          if (this.arrayDatosCSV.data.length > 0) {
            this.disabledBtnCalcular = false;
          } else {
            this.disabledBtnCalcular = true;
          }
        }
      );
    } else {
      this.mostrarMensajeError("Hay un error con el CSV o no se lo cargó... ");
    }
  }

  async learnLinear() {
    if (this.arrayDatosCSV.data != undefined) {
      this.valY = [];

      //utilizo esta linea para poder utilizar la biblioteca cargada en la CDN del index.
      const tf = (window as any).tf;

      for (let j = 0; j < this.arrayDatosCSV.data.length; j++) {
        this.valY.push(this.arrayDatosCSV.data[j].cantidad);
      }

      //Definimos el modelo que sera de regresion lineal
      const model = tf.sequential();
      //Agregamos una capa densa porque todos los nodos estan conectado entre si
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      console.log({ error: 0 });
      // Compilamos el modelo con un sistema de perdida de cuadratico y optimizamos con sdg
      model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

      //Mapeo los valores del array para convertirlos a numericos.
      const numericX = this.valX.map(Number);
      const numericY = this.valY.map(Number);

      // Creamos los tensores para x y para y
      const xs = tf.tensor2d(numericX, [7, 1]);
      const ys = tf.tensor2d(numericY, [7, 1]);

      // Obtenemos la epoch (Las veces que se repetira para encontrar el valor de x)
      var epocas = +(<HTMLInputElement>document.getElementById("repeticiones"))
        .value;
      // Obtenemos el valor de x
      //var nuevoValX = +document.getElementById("nuevoValX").value;

      // Ciclo que ajusta el calculo
      for (let i = 0; i < epocas; i++) {
        //se entrena el modelo con "fit"
        await model.fit(xs, ys, { epochs: 1 });

        // Obtenemos el valor de Y cuando el valor de X sea
        var prediccionY = model.predict(tf.tensor2d([8], [1, 1])).dataSync()[0];
        // Imprimo el valor de y
        document.getElementById("valy").innerText = prediccionY;
        // Imprimo en que epoch vamos
        document.getElementById("epocas").innerText = String(i + 1);
      }
    } else {
      this.mostrarMensajeError("Hay un error con el CSV o no se lo cargó... ");
    }
  }

  mostrarMensajeError(mensaje: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = ["error-alert"];
    this.snackBar.open(`${mensaje}`, "Cerrar", config);
  }

  mostrarMensajeInformativo(mensaje: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = ["info-alert"];
    this.snackBar.open(`${mensaje}`, "Cerrar", config);
  }
}
