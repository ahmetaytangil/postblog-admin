import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LoadingComponent } from "./components/loading/loading.component";
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { GoogleMapsGeneralComponent } from './components/google-maps-general/google-maps-general.component';
import { GoogleMapsGeneralModule } from "./components/google-maps-general/google-maps-general.module";
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { SearchComponent } from './components/search/search.component';
import { BtnFilterComponent } from './components/btn-filter/btn-filter.component';
import { FilterCourierBySearchPipe } from './pipes/filter-courier-by-search.pipe';
import { GetMarkersPipe } from './pipes/get-markers.pipe';
import { GetSrcPipe } from './pipes/get-src.pipe';
import { FilterCourierByCheckPipe } from './pipes/filter-courier-by-check.pipe';
import { StatusComponent } from './components/status/status.component';
import { NewOrderDialogComponent } from './components/new-order-dialog/new-order-dialog.component';
import { OvertimeDialogComponent } from './components/overtime-dialog/overtime-dialog.component';
import { ConsensusDetailDialogComponent } from './components/consensus-detail-dialog/consensus-detail-dialog.component';
import { ChangeConsensusDialogComponent } from './components/change-consensus-dialog/change-consensus-dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { GetLocMarkerPipe } from './pipes/get-loc-marker.pipe';
import { AppSlicePipe } from './pipes/app-slice.pipe';
import { MaterialComponentsModule } from "./material/material-components.module";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [
    LoadingComponent,
    SidebarComponent,
    GoogleMapsGeneralComponent,
    BoardHeaderComponent,
    SearchComponent,
    BtnFilterComponent,
    FilterCourierBySearchPipe,
    GetMarkersPipe,
    GetSrcPipe,
    FilterCourierByCheckPipe,
    StatusComponent,
    NewOrderDialogComponent,
    OvertimeDialogComponent,
    ConsensusDetailDialogComponent,
    ChangeConsensusDialogComponent,
    SnackbarComponent,
    GetLocMarkerPipe,
    AppSlicePipe
  ],
  imports: [
    RouterModule,
    CommonModule,
    GoogleMapsGeneralModule,
    MaterialComponentsModule,
    NgxMaskModule,
  ],
  exports: [
    LoadingComponent,
    SidebarComponent,
    GoogleMapsGeneralComponent,
    BoardHeaderComponent,
    SearchComponent,
    FilterCourierBySearchPipe,
    GetMarkersPipe,
    FilterCourierByCheckPipe,
    StatusComponent,
    GetSrcPipe,
    GetLocMarkerPipe,
    MaterialComponentsModule
  ]
})
export class SharedModule {
}
