import { Injectable } from "@angular/core";
import { io } from "socket.io-client";
import { PATHS } from "../constants/request-paths.constants";
import { AuthService } from "./auth.service";
import { CouriersModel } from "../../features/couriers/models/couriers.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../shared/components/snackbar/snackbar.component";
import { LOCRESPONSE_ } from "../models/socket.model";
import { SocketEnum } from "../enums/socket.enum";

interface TResponse {
  (response: CouriersModel): void
}

@Injectable({ providedIn: 'root' })
export default class SocketService {
  constructor(
    private _AuthService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.socketRemote.on('connect', () => {
      _snackBar.openFromComponent(SnackbarComponent, {
        data: 'Bağlantı Sağlandı.',
        duration: 3000
      })
    });

    this.socketRemote.on('disconnect', () => {
      _snackBar.openFromComponent(SnackbarComponent, {
        data: 'Bağlantı Kesildi.',
        duration: 3000
      })
    });

    this.socketRemote.on('connect_error', () => {
      _snackBar.openFromComponent(SnackbarComponent, {
        data: 'Bağlantı Sağlanamadı. ERROR !',
        duration: 3000
      })
    });
  }

  public socketRemote = io(PATHS.SOCKET, {
    extraHeaders: {
      authorization: this._AuthService.currentToken
    }
  }).connect();

  public emitCourier(courier_id: number, callback: TResponse) {
    this.socketRemote.emit('state', courier_id, (response: CouriersModel) => callback(response))
  }

  public connectFirm(callback: (data: LOCRESPONSE_) => void) {
    const firmId = this._AuthService.firmId;

    if (firmId) {
      this.socketRemote.on(`firm${ firmId }`, ({ type, data }: { type: string, data: LOCRESPONSE_ }) => {
        switch (type) {
          case SocketEnum.LOCRESPONSE:
            callback(data)
            break;
          default:
            break;
        }

      })
    }
  }

}
