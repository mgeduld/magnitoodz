/* tslint:disable max-line-length */
import test from 'ava'
import { factory } from './get-all'
import { apiDoubleFactory } from '../../test/api-fixtures'
import { defaultOffset, defaultLimit } from '../../constants/queries'

test('api:comparison:getAll triggers a query with default offset and limit', async (t: any) => {
  const apiDouble = apiDoubleFactory({ query: {} })
  let offsetValue
  let limitValue

  const queryDouble = (
    offset: number = defaultOffset,
    limit: number = defaultLimit
  ) => {
    offsetValue = offset
    limitValue = limit
    return Promise.resolve('foo')
  }

  const getAll = factory(apiDouble.api, queryDouble)
  t.truthy(typeof getAll === 'function')

  await getAll()

  t.is(offsetValue, defaultOffset, 'called with default offset')
  t.is(limitValue, defaultLimit, 'called with default limit')

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'get')
  t.deepEqual(calledWithArg, { ok: true, data: 'foo' })
})

test('api:comparison:getAll triggers a query with custom offset and limit', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    query: {
      offset: '3',
      limit: '6'
    }
  })
  let offsetValue
  let limitValue

  const queryDouble = (
    offset: number = defaultOffset,
    limit: number = defaultLimit
  ) => {
    offsetValue = offset
    limitValue = limit
    return Promise.resolve('foo')
  }

  const getAll = factory(apiDouble.api, queryDouble)
  t.truthy(typeof getAll === 'function')

  await getAll()

  t.is(offsetValue, 3, 'called with custom offset')
  t.is(limitValue, 6, 'called with custom limit')

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'get')
  t.deepEqual(calledWithArg, { ok: true, data: 'foo' })
})
