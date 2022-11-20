export interface ConsensusModel_ {
  id: number;
  courier_id: number;
  name_surname: string;
  profile_logo_url: string;
  status: string;
}

export interface ConsensusRequestBody_ {
  total_km: number;
  additional_km: number;
  total_delivery: number;
  total_order: number;
  overtime_start: string;
  overtime_end: string;
}

export const getConsensusRequestBody = (): ConsensusRequestBody_ => ({
  total_km: 0,
  additional_km: 0,
  total_delivery: 0,
  total_order: 0,
  overtime_start: "09:00",
  overtime_end: "19:00"
})
