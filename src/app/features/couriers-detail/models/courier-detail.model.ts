export interface CourierDetailModel_ {
  workingplan: CourierDetailModel_WorkingPlan;
  reports: CourierDetailModel_Reports;
  id: number;
  profile_logo_url: string;
  name_surname: string;
  status_id: string;
  lat: number;
  long: number;
  plate: string;
  working_type_id: string;
  pool_id: null;
  mobile_phone: string
}

export interface CourierDetailModel_Reports {
  yesterday: CourierDetailModel_Day;
  today: CourierDetailModel_Day;
}

export interface CourierDetailModel_Day {
  total_delivery: number;
  total_order: number;
  total_km: number;
}

export interface CourierDetailModel_WorkingPlan {
  start: string;
  end: string;
}
