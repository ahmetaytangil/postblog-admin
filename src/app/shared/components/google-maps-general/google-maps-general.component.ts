import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { googleMapsStyle } from "../../../core/constants/google-maps-api-key.constant";
import { MarkerLocations } from "../../../features/couriers/models/couriers.model";
import GoogleMapsApiService from "../../../core/services/google-maps-api.service";


@Component({
  selector: 'app-google-maps-general',
  templateUrl: './google-maps-general.component.html',
  styleUrls: [ './google-maps-general.component.scss' ]
})
export class GoogleMapsGeneralComponent implements OnInit {
  @Input() markerLocations!: MarkerLocations[];

  apiLoaded!: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: 41.0121281594222, lng: 29.071687285526558 },
    zoom: 12,
    styles: googleMapsStyle
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };

  constructor(private _GoogleMapsApiService: GoogleMapsApiService) {
    this.apiLoaded = _GoogleMapsApiService.apiLoaded
  }

  ngOnInit(): void {
    const markers = this.markerLocations;
    if (markers) {
      const fund = markers.find(f => f.markerPosition.lat && f.markerPosition.lng !== 0);
      if (fund) this.options.center = fund.markerPosition
    }
  }

}
