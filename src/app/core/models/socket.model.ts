export interface LOCRESPONSE_ {
  loc:          LOCRESPONSE_Loc;
  courier_id:   number;
  firm_id:      number;
  courier_name: string;
  last_update:  Date;
  route:        LOCRESPONSE_Route;
}

export interface LOCRESPONSE_Loc {
  lat:     string;
  long:    string;
  battery: number;
}

export interface LOCRESPONSE_Route {
  time: number;
  km:   number;
  name: string;
}
