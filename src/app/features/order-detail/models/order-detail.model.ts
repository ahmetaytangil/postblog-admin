export interface OrderDetailModel {
  id:            number;
  order_code:    string;
  order_date:    Date;
  customer_name: string;
  address:       string;
  delivery_note: string;
  lat:           string;
  long:          string;
  location_name: string;
  amount:        number;
  status_id:     string;
  delivery:      OrderDetailModel_Delivery;
  courier:       OrderDetailModel_Courier;
  payment:       OrderDetailModel_Payment;
  products:      OrderDetailModel_Product[];
}


export interface OrderDetailModel_Courier {
  id:            null;
  name:          null;
  status:        null;
  profile_image: null;
}

export interface OrderDetailModel_Delivery {
  check_in_id:     number;
  delivery_type:   string;
  delivery_status: string;
  slot_code:       null;
  slot_date:       null;
}

export interface OrderDetailModel_Payment {
  code:  string;
  title: string;
  icon:  null;
}

export interface OrderDetailModel_Product {
  id:                  number;
  item_code:           string;
  barcode:             null;
  item_name:           string;
  qty:                 number;
  ok_qty:              number;
  cancel_qty:          number;
  item_price:          number;
  total_price:         number;
  cancel_price:        number;
  total_price2:        number;
  is_cancelable:       null;
  item_status_id:      string;
  order_id:            number;
  sale_status_id:      string;
  unit_id:             string;
  warehouse_status_id: string;
}
