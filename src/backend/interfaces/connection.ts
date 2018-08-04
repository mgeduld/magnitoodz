export interface IConnection {
  (name: string): any
  [name: string]: any
}
