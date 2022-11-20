import { Pipe, PipeTransform } from '@angular/core';
import { CourierFilter$, CouriersModel, MarkerLocations } from "../../features/couriers/models/couriers.model";
import { LOCRESPONSE_ } from "../../core/models/socket.model";
import { getSrc } from "../../core/utils/helper";

@Pipe({
  name: 'getMarkers'
})
export class GetMarkersPipe implements PipeTransform {


  transform(
    initialCouriers: CouriersModel[],
    couriersStatus: CourierFilter$,
    iconName: string | undefined,
    locData: LOCRESPONSE_[] | undefined
  ): MarkerLocations[] {
    if (initialCouriers) {
      return initialCouriers.map(courier => {
        let fund = null;
        if (locData) {
          fund = locData.find(f => f.courier_id === courier.id)
        }
        return {
          markerPosition: {
            lat: Number(fund?.loc?.lat || courier.lat),
            lng: Number(fund?.loc?.long || courier.long)
          },
          icon: getSrc(couriersStatus.getByStatusCode(courier.status)?.color, iconName)
        }
      })
    }
    return [];
  }
}
