import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DetalleVentasDialogComponent } from "./detalle-ventas-dialog.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DetalleVentasDialogService {
  dialogs: MatDialogRef<any>[] = [];
  constructor(private dialog: MatDialog) {}

  openDialogDetalle(ventasId: any): Observable<boolean> {
    const dialogRef = this.dialog.open(DetalleVentasDialogComponent, {
      width: "100%",
      data: { ventasId: ventasId },
    });

    this.dialogs.push(dialogRef);
    return dialogRef.afterClosed();
  }

  closeDialog() {
    for (const dialogRef of this.dialogs) {
      dialogRef.close();
    }
    this.dialogs = [];
  }
}
