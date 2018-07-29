export interface IRestApi {
    get?: Function
    post?: Function
    put?: Function
    delete?: Function
}

export interface IResponse {
    json?: (value: object | Array<any>) => Promise<any>
    cookie?(key: string, value: any, config: object)
}

export interface IRequest {
    params?: { [key: string]: any }
    body?: { [key: string]: any }
    app?: {
        get: (key: string) => any
    }
}

