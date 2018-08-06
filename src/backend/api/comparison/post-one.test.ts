import test from 'ava'
import { factory } from './post-one'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'
import { ErrorMessage } from '../../enums/error-message'

test('api:comparison:postOne triggers queries and then submits a response', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    body: {
      user_id: '2',
      title: 'Cats vs Dogs',
      span_1_name: 'Foo',
      span_2_name: 'Bar',
      span_1_magnitude: 50,
      span_2_magnitude: 25
    }
  })
  const userQueryDouble = queryDoubleFactory('foo')
  const comparisonQueryDouble = queryDoubleFactory('foo')
  const postOne = factory(
    apiDouble.api,
    userQueryDouble.query,
    comparisonQueryDouble.query
  )
  t.truthy(typeof postOne === 'function', 'returned a function')

  await postOne()

  const userQueryWasCalled = await userQueryDouble.wasCalled()
  t.truthy(userQueryWasCalled, 'first query was called')

  const comparisonQueryWasCalled = await comparisonQueryDouble.wasCalled()
  t.truthy(comparisonQueryWasCalled, 'second query was called')

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(calledWithArg, { ok: true }, 'responded as expected')
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
  const postOne = factory(
    apiDouble.api,
    userQueryDouble.query,
    comparisonQueryDouble.query
  )

  await postOne()

  const userQueryWasCalled = await userQueryDouble.wasCalled()
  t.truthy(userQueryWasCalled, 'first query called')

  const comparisonQueryWasCalled = await comparisonQueryDouble.wasCalled()
  t.falsy(!!comparisonQueryWasCalled, 'second query not called')

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(
    nextCalledWith,
    new Error(`${ErrorMessage.invalidUserId}NO SUCH USER`)
  ),
    'next called with error1'
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
  const postOne = factory(
    apiDouble.api,
    userQueryDouble.query,
    comparisonQueryDouble.query
  )
  await postOne()

  const userQueryWasCalled = await userQueryDouble.wasCalled()
  t.truthy(userQueryWasCalled, 'first query called')

  const comparisonQueryWasCalled = await comparisonQueryDouble.wasCalled()
  t.falsy(!!comparisonQueryWasCalled, 'second query not called')

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.truthy(
    nextCalledWith.message.match(ErrorMessage.invalidCriteria),
    'next called with error2'
  )
})
