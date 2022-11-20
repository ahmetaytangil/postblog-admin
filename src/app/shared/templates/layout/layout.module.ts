import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "../../../features/home/home.component";
import { LayoutComponent } from "./layout.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class LayoutModule { }
