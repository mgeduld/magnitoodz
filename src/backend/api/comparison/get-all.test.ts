/* tslint:disable max-line-length */
import test from 'ava'
import { factory } from './get-all'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'
import { defaultOffset, defaultLimit } from '../../constants/queries'

test('api:comparison:getAll triggers a query with default offset and limit', async (t: any) => {
  const apiDouble = apiDoubleFactory({ query: {} })

  const magnitoodzQueryDouble = queryDoubleFactory('foo')

  const countQueryDouble = queryDoubleFactory([{ count: '6' }])

  const getAll = factory(
    apiDouble.api,
    magnitoodzQueryDouble.query,
    countQueryDouble.query
  )

  t.truthy(typeof getAll === 'function', 'returns a function')

  await getAll()

  const magnitoodzQueryResponse = await magnitoodzQueryDouble.wasCalled()

  t.deepEqual(
    magnitoodzQueryResponse,
    [defaultOffset, defaultLimit],
    'called with custom offset and limit'
  )

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'get', 'get method used')
  t.deepEqual(
    calledWithArg,
    { ok: true, data: 'foo', count: 6 },
    'responded as expected'
  )
})

test('api:comparison:getAll triggers a query with custom offset and limit', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    query: {
      offset: '3',
      limit: '6'
    }
  })

  const magnitoodzQueryDouble = queryDoubleFactory('foo')

  const countQueryDouble = queryDoubleFactory([{ count: '6' }])

  const getAll = factory(
    apiDouble.api,
    magnitoodzQueryDouble.query,
    countQueryDouble.query
  )

  await getAll()

  const magnitoodzQueryResponse = await magnitoodzQueryDouble.wasCalled()

  t.deepEqual(
    magnitoodzQueryResponse,
    [3, 6],
    'called with custom offset and limit'
  )

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'get', 'get method used')
  t.deepEqual(
    calledWithArg,
    { ok: true, data: 'foo', count: 6 },
    'responded as expected'
  )
})
