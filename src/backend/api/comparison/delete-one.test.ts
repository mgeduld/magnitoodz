import test from 'ava'
import { factory } from './delete-one'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'

test('api:comparison:deleteOne triggers a query and the submits a response', async (t: any) => {
  const apiDouble = apiDoubleFactory({ body: { id: 2, user_id: 1 } })
  const queryDouble = queryDoubleFactory('foo')
  const deleteOne = factory(apiDouble.api, queryDouble.query)
  t.truthy(typeof deleteOne === 'function', 'returned a function')

  await deleteOne()

  const wasCalled = await queryDouble.wasCalled()
  t.truthy(wasCalled, 'query was called')

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'delete', 'delete method used')
  t.deepEqual(calledWithArg, { ok: true }, 'responded as expected')
})
