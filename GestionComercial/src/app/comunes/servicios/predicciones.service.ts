import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PrediccionesService {
  constructor(private http: HttpClient, private Auth: AuthService) {}

  parseCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("csvFile", file);

    return this.http.post(
      environment.apiEndpoint + "/getCSVParseado/",
      formData
    );
  }
}
