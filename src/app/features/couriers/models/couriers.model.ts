import { CourierStatus } from "../../../core/models/auth.model";
import { getCourierStatusParams } from "../../../core/enums/couriers.enum";

export interface CouriersModelFirstLoad {
  id: number;
  profile_logo_url: null | string;
  name_surname: string;
  status_id: string;
  lat: number;
  long: number;
  plate: string;
  working_type_id: null | string;
  pool_id: null | number;
}

export interface CouriersModel {
  id:               number;
  hash:             string;
  validate_hash:    string;
  name:             string;
  firm_id:          number;
  firm:             string;
  client_id:        number;
  client_name:      string;
  status:           string;
  lat:              string;
  long:             string;
  current_pool:     string;
  reject_count:     number;
  messaging_token:  string;
  shift_start_date: Date;
  work:             Work;
  last_update:      Date;
}

export interface Work {
  id:                   number;
  working_day_id:       number;
  working_plan_confirm: boolean;
  working_type:         string;
  firm_id:              number;
  firm_name:            string;
  pool_id:              number;
  pool_name:            string;
  start:                Date;
  end:                  Date;
  tariff_id:            number;
  onway_time:           number;
  is_overwork:          string;
  replacement_plate:    string;
  is_active_state:      boolean;
}


export interface MarkerLocations {
  markerPosition: google.maps.LatLngLiteral,
  icon: string
}

export interface CouriersStatus {
  status_name: string;
  status_code: string;
  filter_text: string;
  checked: boolean;
  color: string
}

export class CourierFilter$ {
  items: CouriersStatus[];

  constructor(statuses: CourierStatus[]) {
    this.items = statuses?.map(status => {
      return {
        status_name: status.status_name,
        status_code: status.status_code,
        filter_text: status.status_name + " Olanlar",
        checked: false,
        color: getCourierStatusParams(status.status_code)
      }
    })
  }

  isAll(): boolean {
    let all = true
    for (let property in this.items) {
      if (this.items[property].checked) {
        all = false;
      }
    }
    return all
  }

  getByStatusCode(status_code: string): CouriersStatus | undefined {
    return this.items?.find(f => f.status_code === status_code) || undefined
  }

  getStatusName(status_code: string): string {
    return this.getByStatusCode(status_code)?.status_name || ""
  }

  getStatusColor(status_code: string): string {
    return this.getByStatusCode(status_code)?.color || ""
  }

  getItems(): CouriersStatus[] {
    if (this.items?.length > 0) return [...this.items]
    return []
  }

}
