import { Component, OnInit } from '@angular/core';
import { CouriersService } from "./services/couriers.service";
import { CourierFilter$, CouriersModel } from "./models/couriers.model";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import { LOCRESPONSE_ } from "../../core/models/socket.model";

@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.component.html',
  styles: [
  ]
})
export class CouriersComponent implements OnInit {
  public couriers!: CouriersModel[]
  public couriersStatus!: CourierFilter$;
  public searchValue!: string;
  public locData!: LOCRESPONSE_[];

  constructor(
    public _couriersService: CouriersService,
    private _auth: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._auth.parameters.subscribe(res => {
      this.couriersStatus = new CourierFilter$(res.courier_status)
    })

    this._couriersService.couriers.subscribe(observer => {
      this.couriers = observer
    })

    this._couriersService.locResponse.subscribe(observer => {
      this.locData = observer
    })


  }

  filterBySearch(value: string) {
    this.searchValue = value
  }

  getTotalCount(total_count: number) {
    return new Array(total_count)
  }

  reloadPage() {
    window.location.reload();
  }

  gotoCourierDetail(courierId: number) {
    this._router.navigate(['/kuryeler' + `/${courierId}`]);
  }
}
