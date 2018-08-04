export interface IRestApi {
  get?: Function
  post?: Function
  put?: Function
  delete?: Function
}

export interface IResponse {
  json?: (value: object | any[]) => Promise<any>
  cookie?(key: string, value: any, config: object)
  clearCookie?(key: string)
}

export interface IRequest {
  params?: { [key: string]: any }
  query?: { [key: string]: any }
  body?: { [key: string]: any }
  app?: {
    get: (key: string) => any
  }
}
