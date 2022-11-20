import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GoogleMapsApiKeyConstant } from "../constants/google-maps-api-key.constant";

@Injectable({ providedIn: 'root' })
export default class GoogleMapsApiService {
  public apiLoaded: Observable<boolean>;

  constructor(private _http: HttpClient) {
    this.apiLoaded = _http.jsonp(`https://maps.googleapis.com/maps/api/js?key=${ GoogleMapsApiKeyConstant }`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );

  }

}
