import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { PATHS } from "../../../core/constants/request-paths.constants";
import { NewOrderRequestBody } from "../../../features/orders/models/orders.model";
import { catchError, throwError } from "rxjs";
import { PaymentType } from "../../../core/models/auth.model";
import { MatDialog } from "@angular/material/dialog";
import { CouriersService } from "../../../features/couriers/services/couriers.service";
import { CouriersModel } from "../../../features/couriers/models/couriers.model";

@Component({
  selector: 'app-new-order-dialog',
  templateUrl: './new-order-dialog.component.html',
  styles: []
})
export class NewOrderDialogComponent implements OnInit {
  couriers!: CouriersModel[];
  paymentTypes!: PaymentType[];
  error = "";
  orderType = 0;
  requestForm: NewOrderRequestBody = {
    full_name: "",
    phone: "",
    amount: 0,
    payment_method_id: null,
    address: "",
    note: "",
    lat: 0,
    long: 0,
    courier_id: null
  };

  constructor(
    private _auth: AuthService,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _CouriersService: CouriersService
  ) {

  }

  ngOnInit(): void {
    this._auth.parameters.subscribe(res => {
      this.paymentTypes = res.payment_type
    })

    this._CouriersService.couriers.subscribe(observer => {
      this.couriers = observer
    })
  }

  sendRequestForm() {
    this.error = ""
    this._http.post(PATHS.ORDERS.POST, this.requestForm).pipe(
      catchError(err => {
        this.error = err?.error?.message || err.message || err
        return throwError(() => err)
      })
    ).subscribe((res) => {if (res) this._dialog.closeAll()})
  }

}
