import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { OrderDetailModel } from "./models/order-detail.model";
import { DeliveryStatusFilter$, OrderStatusFilter$ } from "../../core/models/parameters.model";
import { CouriersService } from 'src/app/features/couriers/services/couriers.service';
import { CouriersModel } from "../couriers/models/couriers.model";
import { ORDER_STATUS } from "../../core/enums/order-status.enum";

@Component({
  selector: 'app-order-detail-dialog',
  template: `
    <h2 class="mat-dialog-title-outer headline-6" mat-dialog-title>
      <span>Sipariş Detayı</span>
      <span class="dialog-title-close" mat-dialog-close="">
        <img alt="" height="12" [src]="'close-dark.svg' | getSrc" width="12">
      </span>
    </h2>
    <div class="mat-dialog-content-outer">
      <mat-dialog-content class="mat-typography">
        <div class="row">
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Sipariş Durumu</h6>
            <div [ngClass]="'general-input-outer mt-2 ' + getOrderStatusColor()">
              <img [src]="'./assets/images/icons/navigation/courier-parameter-' + getOrderStatusColor() + '-delivery.svg'"
                   alt="">
              <span>{{ getOrderStatusName() }}</span>
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Teslimat Durumu</h6>
            <div [ngClass]="'general-input-outer mt-2 ' + getDeliveryStatusColor()">
              <img [src]="'./assets/images/icons/navigation/courier-parameter-' + getDeliveryStatusColor() + '-delivery.svg'"
                   alt="">
              <span>{{ getDeliveryStatusName() }}</span>
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Kurye</h6>
            <div class="general-input-outer mt-2">
              {{ data.order.courier.name || '(Atanmamış)' }}
            </div>
          </div>
          <!--<div class="col-xs-6 mb-4" *ngIf="canCourierBeAppointed()">
            <h6 class="headline-6 fw-medium">Yeni Kurye Ata</h6>
            <div class="general-input-outer mt-2">
              <select class="app-input pl-auto">
                <option value="0">Kurye Seçin</option>
                <option [value]="courier.id" *ngFor="let courier of couriers">
                  {{ courier.name }}
                </option>
              </select>
            </div>
          </div>-->
          <div class="col-xs-6 mb-4" *ngIf="data.order.order_date">
            <h6 class="headline-6 fw-medium">Sipariş Tarihi</h6>
            <div class="general-input-outer mt-2">
              {{ data.order.order_date | date:'short' }}
            </div>
          </div>
          <div class="col-xs-6 mb-4" *ngIf="data.order.order_code">
            <h6 class="headline-6 fw-medium">Sipariş Numarası</h6>
            <div class="general-input-outer mt-2">
              {{ data.order.order_code }}
            </div>
          </div>
          <div class="col-xs-6 mb-4" *ngIf="data.order.customer_name">
            <h6 class="headline-6 fw-medium">Müşteri Adı</h6>
            <div class="general-input-outer mt-2">
              {{ data.order.customer_name }}
            </div>
          </div>
          <div class="col-xs-6 mb-4" *ngIf="data.order.amount">
            <h6 class="headline-6 fw-medium">Sipariş Tutarı</h6>
            <div class="general-input-outer mt-2">
              {{ data.order.amount }} TL
            </div>
          </div>
          <div class="col-xs-6 mb-4" *ngIf="data.order.payment?.title">
            <h6 class="headline-6 fw-medium">Ödeme Yöntemi</h6>
            <div class="general-input-outer mt-2">
              {{ data.order.payment.title }}
            </div>
          </div>
          <div class="col-xs-12 mb-4" *ngIf="data.order.address">
            <h6 class="headline-6 fw-medium">Teslimat Adresi</h6>
            <div class="general-input-outer mt-2">
              {{ data.order.address }}
            </div>
          </div>
          <div class="col-xs-12" *ngIf="data.order.delivery_note">
            <h6 class="headline-6 fw-medium">Sipariş Notu</h6>
            <div class="general-input-outer mt-2">
              {{ data.order.delivery_note }}
            </div>
          </div>
        </div>
      </mat-dialog-content>
    </div>

  `,
  styles: []
})
export class OrderDetailDialogComponent implements OnInit {
  public couriers!: CouriersModel[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      order: OrderDetailModel,
      deliveryStatuses: DeliveryStatusFilter$,
      orderStatuses: OrderStatusFilter$
    },
    private _CouriersService: CouriersService
  ) {
  }

  ngOnInit(): void {
    this._CouriersService.couriers.subscribe(observer => {
      this.couriers = observer
    })
  }

  getOrderStatusName() {
    return this.data.orderStatuses.getById(this.data.order.status_id)?.status_name
  }

  getOrderStatusColor() {
    return this.data.orderStatuses.getById(this.data.order.status_id)?.color
  }

  getDeliveryStatusName() {
    return this.data.deliveryStatuses.getById(this.data.order.delivery.delivery_status)?.status_name
  }

  getDeliveryStatusColor() {
    return this.data.deliveryStatuses.getById(this.data.order.delivery.delivery_status)?.color
  }

  canCourierBeAppointed(): boolean {
    const currentStatusCode = this.data.orderStatuses.getById(this.data.order.status_id)?.status_code;

    if (currentStatusCode === ORDER_STATUS.WAIT) {
      return true
    }

    return currentStatusCode === ORDER_STATUS.CANCEL;
  }

}
