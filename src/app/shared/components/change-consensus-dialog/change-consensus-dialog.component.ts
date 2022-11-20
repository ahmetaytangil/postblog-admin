import { Component, OnInit } from '@angular/core';
import { formatTime } from 'src/app/core/utils/format-time';
import { ConsensusRequestBody_, getConsensusRequestBody } from "../../../features/consensus/models/consensus.model";

@Component({
  selector: 'app-change-consensus-dialog',
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
            <div class="app-input-outer mt-2">
              <input
                type="number"
                class="app-input pl-auto"
                placeholder="Toplam Km giriniz"
                [(ngModel)]="requestConsensusBody.total_km"
                [value]="requestConsensusBody.total_km"
              >
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Ek KM</h6>
            <div class="app-input-outer mt-2">
              <input
                type="number"
                class="app-input pl-auto"
                placeholder="Ek Km giriniz"
                [(ngModel)]="requestConsensusBody.additional_km"
                [value]="requestConsensusBody.additional_km"
              >
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Toplam Teslimat</h6>
            <div class="app-input-outer mt-2">
              <input
                type="text"
                class="app-input pl-auto"
                placeholder="Toplam teslimat giriniz"
                [(ngModel)]="requestConsensusBody.total_delivery"
                [value]="requestConsensusBody.total_delivery"
              >
            </div>
          </div>
          <div class="col-xs-6 mb-4">
            <h6 class="headline-6 fw-medium">Toplam Paket</h6>
            <div class="app-input-outer mt-2">
              <input
                type="text"
                class="app-input pl-auto"
                placeholder="Toplam paket giriniz"
                [(ngModel)]="requestConsensusBody.total_order"
                [value]="requestConsensusBody.total_order"
              >
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 mb-4">
            <div class="container-fluid">
              <div class="row">
                <div class="col-xs-6">
                  <h6 class="headline-6 fw-medium">Ek Mesai (Başlangıç)</h6>
                  <div class="app-input-outer mt-2">
                    <input
                      type="text"
                      class="app-input pl-auto"
                      placeholder="Ek mesai giriniz"
                      [(ngModel)]="overtimeStart"
                      mask="hh:mm"
                    >
                  </div>
                </div>
                <div class="col-xs-6">
                  <h6 class="headline-6 fw-medium">Ek Mesai (Başlangıç)</h6>
                  <div class="app-input-outer mt-2">
                    <input
                      type="text"
                      class="app-input pl-auto"
                      placeholder="Ek mesai giriniz"
                      [(ngModel)]="requestConsensusBody.overtime_end"
                      mask="hh:mm"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 mb-4">
            <h6 class="headline-6 fw-medium">Çalıştığı Saat</h6>
            <div class="general-input-outer mt-2">
              Çalıştığı saati değiştirdiğinde otomatik hesaplanacak
            </div>
          </div>
          <div class="text-center w-100">
            <button
              mat-button
              type="button"
              class="inline primary mb-4"
            >
              <img [src]="'check-light.svg' | getSrc" width="20" height="20" alt="">
              <span class="ml">Değişiklikleri Kaydet</span>
            </button>
          </div>
        </div>
      </mat-dialog-content>
    </div>
  `,
  styles: [
  ]
})
export class ChangeConsensusDialogComponent implements OnInit {
  public requestConsensusBody: ConsensusRequestBody_ = getConsensusRequestBody()

  set overtimeStart(value: string) {
    this.requestConsensusBody.overtime_start = formatTime(value)
  }

  get overtimeStart(): string {
    return this.requestConsensusBody.overtime_start
  }

  constructor() { }

  ngOnInit(): void {
  }

}
