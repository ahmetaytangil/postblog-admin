import { Component, Inject, OnInit } from '@angular/core';
import { ConsensusService } from "../../../features/consensus/services/consensus.service";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ChangeConsensusDialogComponent } from "../change-consensus-dialog/change-consensus-dialog.component";

@Component({
  selector: 'app-consensus-detail-dialog',
  template: `
    <h2 class="mat-dialog-title-outer headline-6" mat-dialog-title>
      <span>Fatih Çakır</span>
      <span class="dialog-title-close" mat-dialog-close="">
        <img alt="" height="12" [src]="'close-dark.svg' | getSrc" width="12">
      </span>
    </h2>
    <div class="mat-dialog-content-outer">
      <mat-dialog-content class="mat-typography">
        <div class="row">
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Toplam KM</h6>
            <div class="general-input-outer mt-2">
              149 KM
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Ek KM</h6>
            <div class="general-input-outer mt-2">
              149 KM
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Toplam Teslimat</h6>
            <div class="general-input-outer mt-2">
              149 KM
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Toplam Paket</h6>
            <div class="general-input-outer mt-2">
              149 KM
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Mesai</h6>
            <div class="general-input-outer mt-2">
              149 KM
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Çalıştığı Saat</h6>
            <div class="general-input-outer mt-2">
              149 KM
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Ek Mesai</h6>
            <div class="general-input-outer mt-2">
              149 KM
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Çalıştığı Saat</h6>
            <div class="general-input-outer mt-2">
              149 KM
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 text-lt-sm-center mb-4 text-end">
            <button
              mat-button
              type="button"
              class="inline primary"
              (click)="_consensusService.confirmConsensus(data)"
            >
              <img [src]="'interface/check-all-light.svg' | getSrc" width="20" height="20" alt="">
              <span class="ml">Mutabakatı Onayla</span>
            </button>
          </div>
          <div class="col-xs-12 col-sm-6 text-lt-sm-center mb-4">
            <button
              mat-button
              type="button"
              class="inline secondary-color"
              (click)="openChangeConsensusDialog()"
            >
              <img [src]="'communication/edit-pencil-dark.svg' | getSrc" width="20" height="20" alt="">
              <span class="ml">Değiştir</span>
            </button>
          </div>
        </div>
      </mat-dialog-content>
    </div>
  `,
  styles: []
})
export class ConsensusDetailDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public _consensusService: ConsensusService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openChangeConsensusDialog() {
    this._dialog.open(ChangeConsensusDialogComponent, { autoFocus: false })
  }


}
