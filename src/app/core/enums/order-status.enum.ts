export enum ORDER_STATUS {
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  COMPLETESYNC = "COMPLETESYNC",
  INACT = "INACT",
  ONWAY = "ONWAY",
  WAIT = "WAIT"
}

interface Statuses {
  filter_text: string;
  color: string
}

const getFilterParams = (filter_text: string, color: string) => ({ filter_text, color })


const describeDeliveryStatusFilterItems = (status_id: string): Statuses => {
  switch (status_id) {
    case ORDER_STATUS.CANCEL:
      return getFilterParams("Teslim Edilmeyenler", "red")
    case ORDER_STATUS.COMPLETE:
      return getFilterParams("Tamamlanmış Olanlar", "orange")
    case ORDER_STATUS.COMPLETESYNC:
      return getFilterParams("Senkronize Edilenler", "red")
    case ORDER_STATUS.INACT:
      return getFilterParams("Toplananlar", "green")
    case ORDER_STATUS.ONWAY:
      return getFilterParams("Yolda Olanlar", "orange")
    default:
      return getFilterParams("Bekleyenler", "blue")
  }
}

export const getOrderStatusParams = (status_id: string) => {
  return describeDeliveryStatusFilterItems(status_id)
}
