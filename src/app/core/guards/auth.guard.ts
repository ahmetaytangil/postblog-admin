import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { getHref } from "../utils/routes.utils";
import { ROUTE_PATHS } from "../constants/router-paths.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._auth.isLoggedIn()) {
      this._router.navigate(
        [ getHref(ROUTE_PATHS.login) ],
        { queryParams: { redirectUrl: state.url } }
      )
      return false;
    }
    return true;
  }

}
