import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PATHS } from "../../../core/constants/request-paths.constants";
import { CouriersModel, CouriersModelFirstLoad } from "../models/couriers.model";
import { BehaviorSubject } from "rxjs";
import SocketService from "../../../core/services/socket.service";
import { LOCRESPONSE_ } from "../../../core/models/socket.model";
import { LoadingService } from "../../../core/services/loading.service";

@Injectable({
  providedIn: 'root'
})
export class CouriersService {
  private couriers$ = new BehaviorSubject(<CouriersModel[]>[]);
  public couriers = this.couriers$.asObservable();

  private locResponse$ = new BehaviorSubject(<LOCRESPONSE_[]>[]);
  public locResponse = this.locResponse$.asObservable();

  constructor(
    private _http: HttpClient,
    private _SocketService: SocketService,
    private _LoadingService: LoadingService
  ) {
    this.apiGet()
    _SocketService.connectFirm((data) => {
      this.setLocs(data)
    });
  }

  apiGet() {
    if (this.couriers$.getValue()?.length <= 0) {
      this._SocketService.socketRemote.on('connect', () => {
        this._http.get<CouriersModelFirstLoad[]>(PATHS.COURIERS.GET).subscribe(async res => {
          await res.forEach(courier => {
            this._SocketService.emitCourier(courier.id, (response): void => {
              this.setCouriers(this.concatCouriers(response))
            })
          })
        });
      })
    }
  }

  get getCouriers(): CouriersModel[] {
    return this.couriers$.getValue()
  }

  concatCouriers(courier: CouriersModel): CouriersModel[] {
    return this.getCouriers.concat([ courier ])
  }

  setCouriers(couriers: CouriersModel[]): void {
    this.couriers$.next(couriers)
  }

  setLocs(data: LOCRESPONSE_) {
    const fund = this.locResponse$.getValue().filter(f => f.courier_id !== data.courier_id);
    if (fund) {
      this.locResponse$.next([ ...fund, data ])
    } else {
      this.locResponse$.next([ data ])
    }
  }

  getLocByCourierId(courier_id: number, loc_data?: LOCRESPONSE_[]): LOCRESPONSE_ | null {
    if (loc_data) {
      return loc_data?.find(f => f.courier_id === courier_id) || null
    }
    return this.locResponse$.getValue()?.find(f => f.courier_id === courier_id) || null
  }


}
