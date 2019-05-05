import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { VentasDetalle} from '../modelos/VentasDetalle';
import { Productos} from '../modelos/Productos';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('roma_acceso')
    }
  )
};

@Injectable({
  providedIn: 'root'
})


export class VentasService {

  miVentasDetalle: VentasDetalle[] = [];

  constructor(private http: HttpClient) { }

  agregarDetalleVentaActual(detalle: VentasDetalle) {
    this.miVentasDetalle.push(detalle);
  }

  getDetalleVentaActual() {
    return this.miVentasDetalle;
  }
}
