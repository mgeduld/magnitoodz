export interface IConnection {
    (name: string): Promise<any>;
}