enum COURIERS_STATUS {
  BREAK = "BREAK",
  NONE = "NONE",
  ONWAY = "ONWAY",
  RESTAURANT = "RESTAURANT",
  RETURN = "RETURN",
  WAIT = "WAIT"
}

const courierClasses = (status_id: string) => {
  switch (status_id) {
    case COURIERS_STATUS.BREAK:
      return "orange"
    case COURIERS_STATUS.NONE:
      return "red"
    case COURIERS_STATUS.ONWAY:
      return "orange"
    case COURIERS_STATUS.RETURN:
      return "red"
    case COURIERS_STATUS.WAIT:
      return "orange"
    default:
      return "green"
  }
}

export function getCourierStatusParams(status_id: string) {
  return courierClasses(status_id)
}
