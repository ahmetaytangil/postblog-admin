import { DeliveryStatus, OrderStatus } from "./auth.model";
import { getDeliveryStatusParams } from "../enums/delivery-status.enum";
import { getOrderStatusParams } from "../enums/order-status.enum";

export interface StatusWithFilter {
  status_code: string,
  status_name: string,
  checked: boolean,
  filter_text: string,
  color: string
}

const getFilterParams = (
  checked: boolean,
  status_code: string,
  status_name: string,
  filter_text: string,
  color: string
): StatusWithFilter => ({
  checked,
  status_code,
  status_name,
  filter_text,
  color
})

export class DeliveryStatusFilter$ {
  items: StatusWithFilter[];
  constructor(statuses: DeliveryStatus[]) {
    this.items = statuses.map(status => {
      const params = getDeliveryStatusParams(status.delivery_status_code)
      return getFilterParams(
        false,
        status.delivery_status_code,
        status.delivery_status_name,
        params.filter_text,
        params.color
      )
    })
  }
  getById(status_id: string): StatusWithFilter | undefined {
    return this.items.find(f => f.status_code === status_id)
  }
}

export class OrderStatusFilter$ {
  items: StatusWithFilter[];
  constructor(statuses: OrderStatus[]) {
    this.items = statuses.map(status => {
      const params = getOrderStatusParams(status.order_status_code)
      return getFilterParams(
        false,
        status.order_status_code,
        status.order_status_name,
        params.filter_text,
        params.color
      )
    })
  }
  getById(status_id: string): StatusWithFilter | undefined {
    return this.items.find(f => f.status_code === status_id)
  }
}
