import { Pipe, PipeTransform } from '@angular/core';
import { CouriersModel } from "../../features/couriers/models/couriers.model";

@Pipe({
  name: 'filterCourierBySearch'
})
export class FilterCourierBySearchPipe implements PipeTransform {
  transform(
    initialCouriers: CouriersModel[],
    searchInputValue: string | undefined
  ): CouriersModel[] {
    if (!searchInputValue) {
      return initialCouriers;
    }
    const value = searchInputValue.toLocaleLowerCase('tr-TR')
    return initialCouriers.filter(f => {
      const courierNameLC = f.name.toLocaleLowerCase('tr-TR')
      if (courierNameLC.includes(value)) return f
      return null
    })
  }
}
