import test from 'ava'
import { factory } from './logout'
import { IResponse, IRestApi } from '../../interfaces/express'

test('api::authentication::logout calls res.clearCookie', (t: any) => {
  let actual
  const res: IResponse = {
    json(value: object | any[]): Promise<any> {
      return Promise.resolve(value)
    },
    clearCookie(key: string) {
      actual = key
    }
  }
  const api: IRestApi = {
    get(route: string, callback: Function) {
      callback({}, res)
    }
  }
  factory(api)()
  t.is(actual, 'user_id')
})
