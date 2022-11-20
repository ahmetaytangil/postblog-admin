import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { PATHS } from "../../core/constants/request-paths.constants";
import { OrderModel } from "./models/orders.model";
import { DeliveryStatusFilter$, OrderStatusFilter$ } from "../../core/models/parameters.model";
import { MatDialog } from "@angular/material/dialog";
import { OrderDetailDialogComponent } from "../order-detail/order-detail-dialog.component";
import { OrderDetailModel } from "../order-detail/models/order-detail.model";
import { NewOrderDialogComponent } from "../../shared/components/new-order-dialog/new-order-dialog.component";
import { catchError, throwError } from "rxjs";
import { formatDate } from "@angular/common";
import { CouriersService } from "../couriers/services/couriers.service";
import { CouriersModel } from "../couriers/models/couriers.model";

type TGetOrdersWithFilters = {
  page?: number,
  searchValue?: string,
  selectedStatus?: string,
  date?: string,
  courier_id?: number
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: [ ]
})
export class OrdersComponent implements OnInit {
  public selectedDate!: Date;
  public formattedDate!: string;
  public orderStatuses!: OrderStatusFilter$;
  public deliveryStatuses!: DeliveryStatusFilter$;
  public orders!: OrderModel | null;
  public selectedStatus: string = "ALL";
  public searchValue!: string;
  public selectedCourier: number = -1;
  public couriers!: CouriersModel[];
  timer: any;

  constructor(
    private _auth: AuthService,
    private _http: HttpClient,
    public dialog: MatDialog,
    private _CouriersService: CouriersService
  ) {
    this._auth.parameters.subscribe(res => {
      if (res) {
        if (res.delivery_status)
          this.deliveryStatuses = new DeliveryStatusFilter$(res.delivery_status)
        if (res.order_status)
          this.orderStatuses = new OrderStatusFilter$(res.order_status)
      }
    })
  }

  ngOnInit(): void {
    this._http.get<OrderModel>(PATHS.ORDERS.GET).subscribe(res => this.orders = res);

    this._CouriersService.couriers.subscribe(observer => {
      this.couriers = observer
    })
  }

  reloadPage() {
    window.location.reload();
  }

  getCurrentStatusColor(status_id: string) {
    return this.orderStatuses?.getById(status_id)?.color || ''
  }

  getCurrentStatusName(status_id: string) {
    return this.orderStatuses?.getById(status_id)?.status_name || ''
  }

  getTotalCount(total_count: number) {
    return new Array(total_count)
  }

  onPaginationChange(page: number) {
    this.getOrdersWithFilters(
      { page }
    )
  }

  onFiltered(e: any, selectedStatus: string) {
    e.stopPropagation()
    this.getOrdersWithFilters(
      { selectedStatus }
    )
  }

  onSearchValue(searchValue: string) {
    clearInterval(this.timer);
    this.timer = setTimeout(async () => {
      this.getOrdersWithFilters(
        { searchValue }
      )
    }, 1000);
    this.searchValue = searchValue
  }

  getOrdersWithFilters({ page, searchValue, selectedStatus, date, courier_id }: TGetOrdersWithFilters): void {
    this._http.get<OrderModel>(PATHS.ORDERS.FILTER(
      page || this.orders?.page || 1, 12,
      searchValue || this.searchValue || "",
      selectedStatus || this.selectedStatus || "",
      date || this.formattedDate || "",
      courier_id || this.selectedCourier
    )).pipe(catchError(err => {
      this.orders = null
      return throwError(() => err)
    })).subscribe(res => {
      if (res) this.orders = res
    })
  }

  openOrderDetail(order_id: number) {
    this._http.get<OrderDetailModel>(PATHS.ORDERS.DETAIL(order_id)).subscribe(res => {
      this.dialog.open(OrderDetailDialogComponent, {
        autoFocus: false,
        data: {
          order: res,
          deliveryStatuses: this.deliveryStatuses,
          orderStatuses: this.orderStatuses
        }
      });
    })
  }

  openNewOrderDialog() {
    this.dialog.open(NewOrderDialogComponent, { autoFocus: false })
  }

  onChangeDatePicker(date: Date) {
    const formattedDate = formatDate(date, 'y-M-d', 'tr-TR');
    this.formattedDate = formattedDate
    this.getOrdersWithFilters({ date: formattedDate });
  }

  onSelectedCourier(e: any, courier_id: number) {
    e.stopPropagation()
    this.getOrdersWithFilters({ courier_id })
    this.selectedCourier = courier_id
  }

}
