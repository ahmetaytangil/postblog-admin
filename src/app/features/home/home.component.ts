import { Component, OnInit } from '@angular/core';
import { CouriersService } from "../couriers/services/couriers.service";
import { CourierFilter$, CouriersModel } from "../couriers/models/couriers.model";
import { AuthService } from "../../core/services/auth.service";
import { LOCRESPONSE_ } from "../../core/models/socket.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ ]
})
export class HomeComponent implements OnInit {
  public couriers!: CouriersModel[];
  public locData!: LOCRESPONSE_[];
  public searchValue!: string
  public couriersStatus!: CourierFilter$;

  constructor(
    private _couriersService: CouriersService,
    private _auth: AuthService,
  ) {
  }

  ngOnInit() {
    this._auth.parameters.subscribe(observer => {
      this.couriersStatus = new CourierFilter$(observer.courier_status)
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

  getLocData(courier_id: number): LOCRESPONSE_ | null {
    if (this.locData) return this._couriersService.getLocByCourierId(courier_id, this.locData)
    return null
  }




}
