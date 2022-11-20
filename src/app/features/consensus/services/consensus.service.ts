import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PATHS } from "../../../core/constants/request-paths.constants";
import { MatDialog } from "@angular/material/dialog";

interface ConfirmResponse {
  completed: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ConsensusService {
  constructor(private _http: HttpClient, private _dialog: MatDialog) { }
  confirmConsensus(consensus_id: number) {
    this._http.put<ConfirmResponse>(PATHS.CONSENSUS.CONFIRM(consensus_id), { status: true })
      .subscribe(res => {
        if (res?.completed) this._dialog.closeAll()
      })
  }
}
