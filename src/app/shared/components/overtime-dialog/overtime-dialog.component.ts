import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PATHS } from "../../../core/constants/request-paths.constants";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";

interface Req {
  completed: boolean
}

@Component({
  selector: 'app-overtime-dialog',
  template: `
    <h2 class="mat-dialog-title-outer headline-6" mat-dialog-title>
      <span>Ek Mesai Talep Et</span>
      <span class="dialog-title-close" mat-dialog-close="">
        <img alt="" height="12" [src]="'close-dark.svg' | getSrc" width="12">
      </span>
    </h2>
    <div class="mat-dialog-content-outer small text-center">
      <mat-dialog-content class="mat-typography">
        <mat-radio-group [(ngModel)]="selectedHour">
          <mat-radio-button class="w-25 mb-4" value="1" checked>
            1 Saat
          </mat-radio-button>
          <mat-radio-button class="w-25 mb-4" value="2">
            2 Saat
          </mat-radio-button>
          <mat-radio-button class="w-25 mb-4" value="3">
            3 Saat
          </mat-radio-button>
          <mat-radio-button class="w-25 mb-4" value="4">
            4 Saat
          </mat-radio-button>
          <mat-radio-button class="w-25 mb-4" value="5">
            5 Saat
          </mat-radio-button>
          <mat-radio-button class="w-25 mb-4" value="6">
            6 Saat
          </mat-radio-button>
        </mat-radio-group>
        <div>
          <button mat-button class="secondary-color inline" (click)="createRequest()">
            <img [src]="'circle-check-dark.svg' | getSrc" width="20" height="20" alt="">
            <span class="ml">Talebi Oluştur</span>
          </button>
        </div>
      </mat-dialog-content>
    </div>
  `,
  styles: [
  ]
})
export class OvertimeDialogComponent implements OnInit {
  selectedHour!: string;

  constructor(
    private _http: HttpClient,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { courierId: number }
  ) { }

  ngOnInit(): void {
  }


  createRequest() {
    this._http.post<Req>(PATHS.COURIERS.POST_OVERTIME(this.data.courierId),{
      hour: Number(this.selectedHour)
    }).subscribe(res => {
      if (res?.completed) this._dialog.closeAll()
    })
  }

}
