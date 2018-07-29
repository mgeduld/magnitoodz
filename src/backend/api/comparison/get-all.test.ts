import test from 'ava'
import { factory } from './get-all'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'

test('api:comparison:getAll triggers a query and the submits a response', async (t: any) => {
    const apiDouble = apiDoubleFactory()
    const queryDouble = queryDoubleFactory('foo')
    const getAll = factory(apiDouble.api, queryDouble.query)
    t.truthy(typeof getAll === 'function')

    await getAll()

    const wasCalled = await queryDouble.wasCalled()
    t.truthy(wasCalled)

    const { calledForMethod, calledWithArg } = await apiDouble.called()
    t.is(calledForMethod, 'get')
    t.deepEqual(calledWithArg, { ok: true, data: 'foo' })
})