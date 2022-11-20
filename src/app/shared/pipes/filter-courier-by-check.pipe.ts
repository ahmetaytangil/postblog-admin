import { Pipe, PipeTransform } from '@angular/core';
import { CouriersModel, CouriersStatus } from "../../features/couriers/models/couriers.model";

@Pipe({
  name: 'filterCourierByCheck'
})
export class FilterCourierByCheckPipe implements PipeTransform {
  transform(
    initialCouriers: CouriersModel[],
    isAll: boolean,
    items: CouriersStatus[]
  ): CouriersModel[] {
    if (isAll) {
      return initialCouriers;
    }
    let filteredCouriers = []
    for (let property in items) {
      if (items[property].checked) {
        const filter = initialCouriers.filter(f => f.status === items[property].status_code)
        if (filter) filteredCouriers.push(...filter)
      }
    }

    return filteredCouriers
  }
}
