import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { getHref } from "../../core/utils/routes.utils";
import { ROUTE_PATHS } from "../../core/constants/router-paths.constants";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  public breakpoint: number = 2;
  public redirectUrl: string = ""
  public transactionId: string = "";
  public error = {
    tel: "",
    otp: ""
  }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 960) ? 1 : 2;

    if (this._auth.isLoggedIn()) {
      this._router.navigate([ getHref(ROUTE_PATHS.home) ])
    } else {
      const nav = this._activatedRoute.snapshot.queryParamMap.get('redirectUrl')
      this.redirectUrl = nav || "/"
    }
  }

  public onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 960) ? 1 : 2;
  }

  public handleLogin(body: any) {
    this.error = {
      tel: "",
      otp: ""
    }
    if (this.transactionId.length) {
      if (!body.controls.otp.valid) this.error.otp = "Lütfen Geçerli bir kod giriniz."

      if (body.controls.otp.valid) {
        this._auth.verificationCode({
          transaction_id: this.transactionId,
          otp_code: body.value.otp,
        }).then(res => {
          if (res.error) {
            this.error.otp = res.error
          } else if (res) {
            this._router.navigateByUrl(this.redirectUrl)
          }
        })
      }
    } else {
      if (!body.controls.tel.valid) this.error.tel = "Telefon numarası 10-17 karakter olmalıdır."

      if (body.controls.tel.valid) {
        this._auth.login({
          mobile_phone: "+90" + body.value.tel
        }).then(res => {
          if (res.error) {
            this.error.tel = res.error
          } else if (res.completed) {
            this.transactionId = res.transaction_id
          }
        })
      }
    }
  }
}
