import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { OvertimeDialogComponent } from "../../shared/components/overtime-dialog/overtime-dialog.component";
import { HttpClient } from "@angular/common/http";
import { PATHS } from "../../core/constants/request-paths.constants";
import { CourierDetailModel_ } from "./models/courier-detail.model";
import { CourierFilter$ } from "../couriers/models/couriers.model";
import { AuthService } from "../../core/services/auth.service";
import { CouriersService } from "../couriers/services/couriers.service";
import { LOCRESPONSE_ } from "../../core/models/socket.model";

@Component({
  selector: 'app-couriers-detail',
  templateUrl: './couriers-detail.component.html',
  styles: []
})
export class CouriersDetailComponent implements OnInit {
  public courier!: CourierDetailModel_;
  public couriersStatus!: CourierFilter$;
  public locData!: LOCRESPONSE_[]

  constructor(
    private route: ActivatedRoute,
    private _dialog: MatDialog,
    private _http: HttpClient,
    private _auth: AuthService,
    public _CouriersService: CouriersService
  ) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const courierIdFromRoute = Number(routeParams.get('courierId'));

    this._http.get<CourierDetailModel_>(PATHS.COURIERS.DETAIL(courierIdFromRoute)).subscribe(res => {
      this.courier = res
    })

    this._auth.parameters.subscribe(observer => {
      this.couriersStatus = new CourierFilter$(observer.courier_status)
    })

    this._CouriersService.locResponse.subscribe(observer => {
      this.locData = observer
    })
  }

  openOvertimeDialog() {
    this._dialog.open(OvertimeDialogComponent, {
      autoFocus: false,
      data: {
        courierId: this.courier.id
      }
    })
  }

}
