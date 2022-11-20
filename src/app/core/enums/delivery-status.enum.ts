export enum DELIVERY_STATUS {
  ASSIGNED = "ASSIGNED",
  ASSIGNING = "ASSIGNING",
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
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
    case DELIVERY_STATUS.ASSIGNED:
      return getFilterParams("Atanmışlar", "orange")
    case DELIVERY_STATUS.ASSIGNING:
      return getFilterParams("Atanacaklar", "orange")
    case DELIVERY_STATUS.CANCEL:
      return getFilterParams("İptal Edilenler", "red")
    case DELIVERY_STATUS.COMPLETE:
      return getFilterParams("Tamamlananlar", "green")
    case DELIVERY_STATUS.ONWAY:
      return getFilterParams("Yolda Olanlar", "orange")
    default:
      return getFilterParams("Bekleyenler", "blue")
  }
}

export const getDeliveryStatusParams = (status_id: string) => {
  return describeDeliveryStatusFilterItems(status_id)
}
