export interface UserModel {
  id: number;
  name_surname: string;
  email: string;
  mobile_phone: string;
  avatar: string;
  is_active: boolean;
  firm_id: number;
  role_id: string;
  client_id: number;
  firm_name: string
}

export interface VerificationResponseModel {
  complete: boolean;
  token: string;
  data: UserModel;
}

export interface LoginBody {
  mobile_phone: string
}

export interface LoginResponse {
  transaction_id: string;
  completed: boolean;
}

export interface VerificationBody {
  transaction_id: string;
  otp_code: string;
}

export interface Parameters {
  courier_type:    CourierType[];
  courier_status:  CourierStatus[];
  delivery_status: DeliveryStatus[];
  delivery_type:   DeliveryType[];
  order_status:    OrderStatus[];
  payment_type:    PaymentType[];
}

export interface CourierStatus {
  status_code: string;
  status_name: string;
}

export interface CourierType {
  type_code: string;
  type_name: string;
}

export interface DeliveryStatus {
  delivery_status_code: string;
  delivery_status_name: string;
  list_order:           number;
}

export interface DeliveryType {
  delivery_type_code: string;
  delivery_type_name: string;
}

export interface OrderStatus {
  order_status_code: string;
  order_status_name: string;
}

export interface PaymentType {
  payment_type_code: string;
  payment_type_name: string;
  icon_url:          null;
}

