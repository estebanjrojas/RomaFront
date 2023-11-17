import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  mostrarMensajeError(mensaje: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = ["error-alert"];
    config.horizontalPosition = "center";
    //config.panelClass = "custom-snackbar";
    this.snackBar.open(`${mensaje}`, "Cerrar", config);
  }

  mostrarMensajeInformativo(mensaje: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.panelClass = ["info-alert"];
    this.snackBar.open(`${mensaje}`, "Cerrar", config);
  }
}
