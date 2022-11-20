import { Pipe, PipeTransform } from '@angular/core';
import { getSrc } from "../../core/utils/helper";
import { LOCRESPONSE_ } from "../../core/models/socket.model";
import { CourierDetailModel_ } from "../../features/couriers-detail/models/courier-detail.model";
import { CourierFilter$, MarkerLocations } from "../../features/couriers/models/couriers.model";

@Pipe({
  name: 'getLocMarker'
})
export class GetLocMarkerPipe implements PipeTransform {

  transform(locResponse: LOCRESPONSE_[], courier: CourierDetailModel_, couriersStatus: CourierFilter$): MarkerLocations[] {
    let loc = locResponse?.find(f => f.courier_id === courier.id)?.loc
    return [
      {
        markerPosition: {
          lat: Number(loc?.lat || courier.lat),
          lng: Number(loc?.long || courier.long)
        },
        icon: getSrc(couriersStatus.getByStatusCode(courier.status_id)?.color, "pin")
      }
    ]
  }

}
