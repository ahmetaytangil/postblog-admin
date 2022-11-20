import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { catchError, Observable, throwError, map } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { BASE_URL, CLIENT_POINT } from "../constants/request-paths.constants";
import { getHref } from "../utils/routes.utils";
import { ROUTE_PATHS } from "../constants/router-paths.constants";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  private baseUrl: string = BASE_URL

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _loading: LoadingService
  ) {
  }

  setHeaders(request: HttpRequest<any>) {
    return request.clone({
      url: this.baseUrl + request.url,
      setHeaders: {
        Authorization: `Bearer ${ this._auth.currentToken }`,
        clientpoint: CLIENT_POINT
      }
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, request.url);
    return next.handle(this.setHeaders(request))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errors = [ 500, 401, 503, 0 ];

          for (let i = 0; i < errors.length; i++) {
            if (error.status === errors[i]) {
              this._router.navigate([ getHref(ROUTE_PATHS.error) ])
            }
          }

          this._loading.setLoading(false, request.url);

          return throwError(() => error?.error?.message || error.message)
        })
      )
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this._loading.setLoading(false, request.url);
        }
        return evt;
      }));
  }
}
