import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class SucursalesService {
  constructor(private http: HttpClient, private Auth: AuthService) {}

  selectAbiertas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.Auth.getTokenUsuarioSesion(),
      }),
    };
    return this.http.get(environment.apiEndpoint + "/sucursales/", httpOptions);
  }
}
