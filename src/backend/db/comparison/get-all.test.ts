/* tslint:disable max-line-length */
import test from 'ava'
import { factory } from './get-all'
import { defaultLimit, defaultOffset } from '../../constants/queries'

test('db:comparison:getAll() makes a connection with default limit and offset', async (t: any) => {
  let limitValue
  let offsetValue
  const leftJoin = () => Promise.resolve('foo')
  const limit = (value?: number) => {
    limitValue = value
    return { leftJoin }
  }
  const offset = (value?: number) => {
    offsetValue = value
    return { limit }
  }
  const from = () => ({ offset })
  const select = () => ({ from })
  const connection: any = { select }
  const getAll = factory(connection)

  t.truthy(typeof getAll === 'function', 'returns a function')

  const result = await getAll()
  t.is(result, 'foo', 'returns value of promise')
  t.is(offsetValue, defaultOffset, 'uses default offset')
  t.is(limitValue, defaultLimit, 'uses default limit')
})

test('db:comparison:getAll() makes a connection with custom limit and default offset', async (t: any) => {
  let limitValue
  let offsetValue
  const leftJoin = () => Promise.resolve('foo')
  const limit = (value?: number) => {
    limitValue = value
    return { leftJoin }
  }
  const offset = (value?: number) => {
    offsetValue = value
    return { limit }
  }
  const from = () => ({ offset })
  const select = () => ({ from })
  const connection: any = { select }

  const getAll = factory(connection)

  const result = await getAll(1)

  t.is(result, 'foo', 'returns value of promise')
  t.is(offsetValue, 1, 'uses a custom offset')
  t.is(limitValue, defaultLimit, 'uses a defasult limit')
})

test('db:comparison:getAll() makes a connection with a custom limit and offset', async (t: any) => {
  let limitValue
  let offsetValue
  const leftJoin = () => Promise.resolve('foo')
  const limit = (value?: number) => {
    limitValue = value
    return { leftJoin }
  }
  const offset = (value?: number) => {
    offsetValue = value
    return { limit }
  }
  const from = () => ({ offset })
  const select = () => ({ from })
  const connection: any = { select }

  const getAll = factory(connection)

  const result = await getAll(1, 2)

  t.is(result, 'foo', 'returns value of promise')
  t.is(offsetValue, 1, 'uses a custom offset')
  t.is(limitValue, 2, 'uses a custom limit')
})
