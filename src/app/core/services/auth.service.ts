import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from "rxjs";
import {
  LoginBody,
  LoginResponse,
  Parameters,
  UserModel,
  VerificationBody,
  VerificationResponseModel
} from "../models/auth.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { PATHS } from "../constants/request-paths.constants";
import { getTokenLS, getUserLS, setTokenLS, setUserLS } from "../utils/localstorage.utils";
import { getHref } from "../utils/routes.utils";
import { ROUTE_PATHS } from "../constants/router-paths.constants";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user$ = new BehaviorSubject(<UserModel>{})
  public user = this.user$.asObservable();

  private token$ = new BehaviorSubject(<string>"")
  public token = this.token$.asObservable();

  private parameters$ = new BehaviorSubject(<Parameters>{})
  public parameters = this.parameters$.asObservable();

  public sideBarOpened: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
  }

  public login(body: LoginBody): Promise<any> {
    return new Promise(resolve => {
      this._http.post<LoginResponse>(PATHS.AUTH.LOGIN, body)
        .pipe(
          catchError(err => {
            resolve({ error: err })
            return throwError(() => err)
          })
        )
        .subscribe(res => {
          if (res.completed) {
            resolve(res)
          } else {
            resolve({ error: 'Giriş Tamamlanamadı' })
          }
        })
    })
  }

  public verificationCode(body: VerificationBody): Promise<any> {
    return new Promise(resolve => {
      this._http.post<VerificationResponseModel>(PATHS.AUTH.VERIFICATION, body)
        .pipe(
          catchError(err => {
            resolve({ error: err.error?.message || err.message || err })
            return throwError(() => err.message)
          })
        )
        .subscribe((res) => {
          if (res.complete) {
            setUserLS(res.data)
            this.user$.next(res.data);
            setTokenLS(res.token)
            this.token$.next(res.token)
            resolve(true);
          } else {
            resolve({ error: "Onaylama Tamamlanamadı" })
          }
        })
    })
  }

  public logOut() {
    localStorage.clear();
    this._router.navigate([ getHref(ROUTE_PATHS.login) ])
    location.reload();
  }

  public isLoggedIn(): boolean {
    const user = getUserLS();
    const token = getTokenLS();
    const isLoggedIn: boolean = !!user && token?.length > 0;

    if (isLoggedIn) {
      this.user$.next(user);
      this.token$.next(token);

      this._http
        .get<Parameters>(PATHS.PARAMETERS.GET)
        .subscribe(res => {
          this.parameters$.next(res)
        })
    }

    return isLoggedIn
  }

  public get currentToken(): string {
    return this.token$.value
  }

  public get firmId(): number {return this.user$.getValue().firm_id}



}
