import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { PATHS } from "../../core/constants/request-paths.constants";
import { ConsensusModel_ } from "./models/consensus.model";
import { AuthService } from "../../core/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import {
  ConsensusDetailDialogComponent
} from "../../shared/components/consensus-detail-dialog/consensus-detail-dialog.component";

@Component({
  selector: 'app-consensus',
  templateUrl: './consensus.component.html',
  styles: [
  ]
})
export class ConsensusComponent implements OnInit {
  public selectedDate!: Date;
  public consensusData!: ConsensusModel_[];

  constructor(
    private _http: HttpClient,
    private _auth: AuthService,
    private _dialog: MatDialog
  ) {
    _auth.parameters.subscribe(observer => {
      console.log(observer)
    })
  }

  ngOnInit(): void {
    let date = new Date()
    const formattedDate = formatDate(date, 'y-M-d', 'tr-TR')
    this.getConsensusData(formattedDate);
  }

  private getConsensusData(formattedDate: string) {
    this._http.get<ConsensusModel_[]>(PATHS.CONSENSUS.GET(formattedDate)).subscribe(res => {
      this.consensusData = res
    })
  }

  onChangeDatePicker(date: Date) {
    const formattedDate = formatDate(date, 'y-M-d', 'tr-TR')
    this.getConsensusData(formattedDate);
  }

  reloadPage() {
    window.location.reload()
  }

  openConsensusDetail(consensus_id: number) {
    this._dialog.open(ConsensusDetailDialogComponent, { autoFocus: false, data: consensus_id })
  }

}
