import { Component, Inject, OnInit } from '@angular/core';
import { LoadingService } from "./core/services/loading.service";
import { delay } from "rxjs";
import { DateAdapter } from "@angular/material/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-root',
  template: `
    <app-loading *ngIf="loading"></app-loading>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit{
  loading: boolean = false;

  constructor(
    private _loading: LoadingService,
    private dateAdapter: DateAdapter<any>,
    @Inject(DOCUMENT) private document: Document
  ) {
    dateAdapter.setLocale('tr')
  }

  ngOnInit(): void {
    this.document.documentElement.lang = 'tr';
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe(loading => {
        this.loading = loading
      })
  }
}
