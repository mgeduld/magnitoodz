import test from 'ava'
import { factory } from './post-one'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'

test('api:comparison:postOne triggers a query and the submits a response', async (t: any) => {
    const apiDouble = apiDoubleFactory({
        body: {
            user_id: '2',
            span_1_name: 'Foo',
            span_2_name: 'Bar',
            span_1_magnitude: 50,
            span_2_magnitude: 25
        }
    })
    const userQueryDouble = queryDoubleFactory('foo')
    const comparisonQueryDouble = queryDoubleFactory('foo')
    const postOne = factory(apiDouble.api, userQueryDouble.query, comparisonQueryDouble.query)
    t.truthy(typeof postOne === 'function')

    await postOne()

    const userQueryWasCalled = await userQueryDouble.wasCalled()
    t.truthy(userQueryWasCalled)

    const comparisonQueryWasCalled = await comparisonQueryDouble.wasCalled()
    t.truthy(comparisonQueryWasCalled)

    const { calledForMethod, calledWithArg } = await apiDouble.called()
    t.is(calledForMethod, 'post')
    t.deepEqual(calledWithArg, { ok: true })
})

test('api:comparison:postOne fails due to bad userId', async (t: any) => {
    const apiDouble = apiDoubleFactory({
        body: {
            user_id: 'NO SUCH USER',
            span_1_name: 'Foo',
            span_2_name: 'Bar',
            span_1_magnitude: 50,
            span_2_magnitude: 25
        }
    })
    const userQueryDouble = queryDoubleFactory(undefined)
    const comparisonQueryDouble = queryDoubleFactory('foo')
    const postOne = factory(apiDouble.api, userQueryDouble.query, comparisonQueryDouble.query)
    t.truthy(typeof postOne === 'function')

    await postOne()

    const userQueryWasCalled = await userQueryDouble.wasCalled()
    t.truthy(userQueryWasCalled)

    const comparisonQueryWasCalled = await comparisonQueryDouble.wasCalled()
    t.falsy(comparisonQueryWasCalled)

    const { calledForMethod, nextCalledWith } = await apiDouble.called()
    t.is(calledForMethod, 'post')
    t.deepEqual(nextCalledWith, new Error('Invalid user id NO SUCH USER'))
})

test('api:comparison:postOne fails due to bad criteria in body', async (t: any) => {
    const apiDouble = apiDoubleFactory({
        body: {
            user_id: '1',
            span_1_name: 'Foo',
            span_2_name: 'Bar',
            // missing span_1_magnitude
            span_2_magnitude: 25
        }
    })
    const userQueryDouble = queryDoubleFactory('foo')
    const comparisonQueryDouble = queryDoubleFactory('foo')
    const postOne = factory(apiDouble.api, userQueryDouble.query, comparisonQueryDouble.query)
    t.truthy(typeof postOne === 'function')

    await postOne()

    const userQueryWasCalled = await userQueryDouble.wasCalled()
    t.truthy(userQueryWasCalled)

    const comparisonQueryWasCalled = await comparisonQueryDouble.wasCalled()
    t.falsy(comparisonQueryWasCalled)

    const { calledForMethod, nextCalledWith } = await apiDouble.called()
    t.is(calledForMethod, 'post')
    t.truthy(nextCalledWith.message.match(/Invalid criteria in/))
})