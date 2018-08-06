/* tslint:disable max-line-length */
import test from 'ava'
import { factory } from './signup'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'
import { ErrorMessage } from '../../enums/error-message'

test('api:authentication:signup triggers queries and then submits a response', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    app: {
      get: () => {}
    },
    body: {
      name: 'Percy',
      email: 'percy@kittehqat.com',
      password: 'sausageNum1!'
    }
  })
  const getUserByEmailOrNameQueryDouble = queryDoubleFactory() // no user found so okay to create
  const createUserQueryDouble = queryDoubleFactory(123)
  const signup = factory(
    apiDouble.api,
    getUserByEmailOrNameQueryDouble.query,
    createUserQueryDouble.query
  )
  t.truthy(typeof signup === 'function', 'returns a function')

  await signup()

  const getUserByEmailOrNameQueryWasCalled = await getUserByEmailOrNameQueryDouble.wasCalled()
  t.truthy(getUserByEmailOrNameQueryWasCalled, 'first query called')

  const createUserQueryWasCalled = await createUserQueryDouble.wasCalled()
  t.truthy(createUserQueryWasCalled, 'second query called')

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(
    calledWithArg,
    {
      id: 123,
      name: 'Percy',
      message: 'Signed up',
      ok: true
    },
    'responses as expected'
  )
})

test('api:authentication:signup triggers queries (with meta data) and then submits a response', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    app: {
      get: () => {}
    },
    body: {
      name: 'Percy',
      email: 'percy@kittehqat.com',
      password: 'sausageNum1!',
      meta: 'likes treats'
    }
  })
  const getUserByEmailOrNameQueryDouble = queryDoubleFactory() // no user found so okay to create
  const createUserQueryDouble = queryDoubleFactory(123)
  const signup = factory(
    apiDouble.api,
    getUserByEmailOrNameQueryDouble.query,
    createUserQueryDouble.query
  )

  await signup()

  const getUserByEmailOrNameQueryWasCalled = await getUserByEmailOrNameQueryDouble.wasCalled()
  t.truthy(getUserByEmailOrNameQueryWasCalled, 'first query called')

  const createUserQueryWasCalled = await createUserQueryDouble.wasCalled()
  t.truthy(!!createUserQueryWasCalled, 'second query called')

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(
    calledWithArg,
    {
      id: 123,
      name: 'Percy',
      message: 'Signed up',
      ok: true
    },
    'responsed as expected'
  )
})

test('api:authentication:signup fails when a user already exists with same email or name', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    app: {
      get: () => {}
    },
    body: {
      name: 'Percy',
      email: 'percy@kittehqat.com',
      password: 'sausageNum1!',
      meta: 'likes treats'
    }
  })
  const getUserByEmailOrNameQueryDouble = queryDoubleFactory('FOUND') // user with name or email exists
  const createUserQueryDouble = queryDoubleFactory(123)
  const signup = factory(
    apiDouble.api,
    getUserByEmailOrNameQueryDouble.query,
    createUserQueryDouble.query
  )

  await signup()

  const getUserByEmailOrNameQueryWasCalled = await getUserByEmailOrNameQueryDouble.wasCalled()
  t.truthy(getUserByEmailOrNameQueryWasCalled, 'first query called')

  const createUserQueryWasCalled = await createUserQueryDouble.wasCalled()
  t.falsy(createUserQueryWasCalled, 'second query not called')

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'used post method')
  t.deepEqual(
    nextCalledWith,
    new Error(ErrorMessage.alreadyRegistered),
    'next called with error'
  )
})

test('api:authentication:signup fails credentials are invalid', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    app: {
      get: () => {}
    },
    body: {
      name: 'Percy',
      // missing email param
      password: 'sausageNum1!',
      meta: 'likes treats'
    }
  })
  const getUserByEmailOrNameQueryDouble = queryDoubleFactory() // user with name or email exists
  const createUserQueryDouble = queryDoubleFactory(123)
  const signup = factory(
    apiDouble.api,
    getUserByEmailOrNameQueryDouble.query,
    createUserQueryDouble.query
  )

  await signup()

  const getUserByEmailOrNameQueryWasCalled = await getUserByEmailOrNameQueryDouble.wasCalled()
  t.falsy(getUserByEmailOrNameQueryWasCalled, 'first query not called')

  const createUserQueryWasCalled = await createUserQueryDouble.wasCalled()
  t.falsy(createUserQueryWasCalled, 'second query not called')

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(
    nextCalledWith,
    new Error(ErrorMessage.invalidCredentials),
    'next called with error'
  )
})
