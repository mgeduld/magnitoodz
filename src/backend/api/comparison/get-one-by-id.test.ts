import test from 'ava'
import { factory } from './get-one-by-id'
import { IRestApi } from '../../interfaces/express';
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'

test('api:comparison:getOneById triggers a query and the submits a response', async (t: any) => {
    const apiDouble = apiDoubleFactory({ params: { id: 2 } })
    const queryDouble = queryDoubleFactory('foo')
    const getOneById = factory(apiDouble.api, queryDouble.query)
    t.truthy(typeof getOneById === 'function')

    await getOneById()
    t.truthy(queryDouble.wasCalled())
    t.is(queryDouble.timesCalled(), 1)

    const { calledForMethod, calledWithArg } = await apiDouble.called()
    t.is(calledForMethod, 'get')
    t.deepEqual(calledWithArg, { ok: true, data: 'foo' })
})