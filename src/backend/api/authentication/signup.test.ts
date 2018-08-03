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
  t.truthy(typeof signup === 'function')

  await signup()

  const getUserByEmailOrNameQueryWasCalled = await getUserByEmailOrNameQueryDouble.wasCalled()
  t.truthy(getUserByEmailOrNameQueryWasCalled)

  const createUserQueryWasCalled = await createUserQueryDouble.wasCalled()
  t.truthy(createUserQueryWasCalled)

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'post')
  t.deepEqual(calledWithArg, { id: 123, message: 'Signed up', ok: true })
})

test('api:authentication:signup triggers queries (with meta datat) and then submits a response', async (t: any) => {
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
  t.truthy(typeof signup === 'function')

  await signup()

  const getUserByEmailOrNameQueryWasCalled = await getUserByEmailOrNameQueryDouble.wasCalled()
  t.truthy(getUserByEmailOrNameQueryWasCalled)

  const createUserQueryWasCalled = await createUserQueryDouble.wasCalled()
  t.truthy(createUserQueryWasCalled)

  const { calledForMethod, calledWithArg } = await apiDouble.called()
  t.is(calledForMethod, 'post')
  t.deepEqual(calledWithArg, { id: 123, message: 'Signed up', ok: true })
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
  t.truthy(typeof signup === 'function')

  await signup()

  const getUserByEmailOrNameQueryWasCalled = await getUserByEmailOrNameQueryDouble.wasCalled()
  t.truthy(getUserByEmailOrNameQueryWasCalled)

  const createUserQueryWasCalled = await createUserQueryDouble.wasCalled()
  t.falsy(createUserQueryWasCalled)

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post')
  t.deepEqual(nextCalledWith, new Error(ErrorMessage.alreadyRegistered))
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
  t.truthy(typeof signup === 'function')

  await signup()

  const getUserByEmailOrNameQueryWasCalled = await getUserByEmailOrNameQueryDouble.wasCalled()
  t.falsy(getUserByEmailOrNameQueryWasCalled)

  const createUserQueryWasCalled = await createUserQueryDouble.wasCalled()
  t.falsy(createUserQueryWasCalled)

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post')
  t.deepEqual(nextCalledWith, new Error(ErrorMessage.invalidCredentials))
})
