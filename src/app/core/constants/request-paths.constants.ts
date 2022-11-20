const protocol = 'https://';
const hostname = 'sandbox.paketleapi.com';
export const BASE_URL = protocol + hostname;

export const CLIENT_POINT = "FIRM_WEB"

const PREFIX = {
  BASE: '/firmweb',
  PATHS: {
    ORDERS: '/orders',
    COURIERS: '/couriers',
    CONSENSUS: '/consensus',
    AUTH: '/auth'
  }
};

// https://sandbox.paketleapi.com/paketle-api-system#/

export const PATHS = {
  AUTH: {
    LOGIN: `${ PREFIX.PATHS.AUTH }/system`,
    VERIFICATION: `${ PREFIX.PATHS.AUTH }/system/verification`
  },
  PARAMETERS: {
    GET: `${ PREFIX.BASE }/parameters`
  },
  ORDERS: {
    GET: `${ PREFIX.BASE }${ PREFIX.PATHS.ORDERS }`,
    POST: `${ PREFIX.BASE }${ PREFIX.PATHS.ORDERS }`,
    DETAIL: (order_id: number) => `${ PREFIX.BASE }${ PREFIX.PATHS.ORDERS }/${ order_id }`,
    FILTER: (
      page: number,
      limit: number,
      keyword: string,
      status: string,
      date: string,
      courier_id: number
    ) => {
      const
        pages = `?page=${page}`,
        key = keyword ? `&keyword=${keyword}` : '',
        stat = status && (status !== "ALL" ? `&status=${status}` : ''),
        courier = courier_id !== -1 ? `&courier_id=${courier_id}` : '',
        limited = `&limit=${limit}`,
        start = `&start_date=${date}`


      return `${ PREFIX.BASE }${ PREFIX.PATHS.ORDERS }${pages}${limited}${key}${courier}${stat}${start}`
    }
  },
  COURIERS: {
    GET: `${ PREFIX.BASE }${ PREFIX.PATHS.COURIERS }`,
    DETAIL: (courier_id: number) => `${ PREFIX.BASE }${ PREFIX.PATHS.COURIERS }/${ courier_id }`,
    POST_OVERTIME: (courier_id: number) => `${ PREFIX.BASE }${ PREFIX.PATHS.COURIERS }/${ courier_id }/overtimerequest`
  },
  CONSENSUS: {
    GET: (date: string, status?: string) => `${ PREFIX.BASE }${ PREFIX.PATHS.CONSENSUS }?date=${date}${status ? `&status=${status}` : ''}`,
    PUT: (consensus_id: number) => `${ PREFIX.BASE }${ PREFIX.PATHS.CONSENSUS }/${ consensus_id }`,
    DETAIL: (consensus_id: number) => `${ PREFIX.BASE }${ PREFIX.PATHS.CONSENSUS }/${ consensus_id }`,
    CONFIRM: (consensus_id: number) => `${ PREFIX.BASE }${ PREFIX.PATHS.CONSENSUS }/${ consensus_id }/confirm`
  },
  SOCKET: 'wss://sandbox-service.paketleapi.com/courier'
};
