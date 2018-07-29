export interface IRestApi {
    get?: Function;
    post?: Function;
    put?: Function;
    delete?: Function;
}

export interface IResponse {
    json?: (value: object | Array<any>) => Promise<any>;
}

export interface IRequest {
    params?: { [key: string]: any }
    body?: { [key: string]: any }
}

