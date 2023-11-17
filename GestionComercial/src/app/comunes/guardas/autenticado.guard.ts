import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../servicios/auth.service";

@Injectable({
  providedIn: "root",
})
export class AutenticadoGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.auth.getTokenUsuarioSesion();
    console.log({ token: token });
    if (!token || token.trim() === "") {
      this.auth.setRedirectUrl(state.url);
      this.router.navigate(["/login"]);
      return false;
    } else {
      if (this.tokenExpirado(this.auth.getTokenUsuarioSesion().trim())) {
        this.router.navigate([""]);
        return false;
      }
      return true;
    }
  }

  private tokenExpirado(token: string) {
    // const expira = JSON.parse(atob(token.split(".")[1])).exp;
    // return Math.floor(new Date().getTime() / 1000) >= expira;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expira = payload.exp;
      return Math.floor(new Date().getTime() / 1000) >= expira;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return false;
    }
  }
}
