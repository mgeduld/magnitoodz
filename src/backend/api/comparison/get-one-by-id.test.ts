import test from 'ava'
import { factory } from './get-one-by-id'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'

test('api:comparison:getOneById triggers a query and the submits a response', async (t: any) => {
  const apiDouble = apiDoubleFactory({ params: { id: 2 } })
  const queryDouble = queryDoubleFactory('foo')
  const getOneById = factory(apiDouble.api, queryDouble.query)
  t.truthy(typeof getOneById === 'function')

  await getOneById()

  const wasCalled = await queryDouble.wasCalled()
  t.truthy(wasCalled)

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'get')
  t.deepEqual(calledWithArg, { ok: true, data: 'foo' })
})
