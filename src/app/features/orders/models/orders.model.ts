export interface OrderModel {
  data:        OrderModelDatum[];
  page:        number;
  limit:       number;
  total_count: number;
  prev_page:   number;
  next_page:   number;
  last_page:   number;
  total_page:  number;
}

export interface OrderModelDatum {
  id:            number;
  order_code:    string;
  order_date:    Date;
  customer_name: string;
  address:       string;
  location_name: string;
  amount:        number;
  delivery:      OrderModelDelivery;
  courier:       OrderModelCourier;
  payment:       OrderModelPayment;
}

export interface OrderModelCourier {
  id:            number;
  name:          string;
  status:        string;
  profile_image: string;
}

export interface OrderModelDelivery {
  check_in_id:     number;
  delivery_type:   string;
  delivery_status: string;
  slot_code:       string;
  slot_date:       string;
  working_type:    string;
}

export interface OrderModelPayment {
  code:  string;
  title: string;
  icon:  string;
}

export interface NewOrderRequestBody {
  full_name:         string;
  phone:             string;
  amount:            number;
  payment_method_id: string | null;
  address:           string;
  note:              string;
  lat:               number;
  long:              number;
  courier_id: number | null;
}

