import test from 'ava'
import { factory } from './login'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'
import { ErrorMessage } from '../../enums/error-message'

test(
  'api::authentication::login triggers queries and then submits a response',
  async (t: any) => {
    const apiDouble = apiDoubleFactory({
      app: {
        get: () => {}
      },
      body: {
        email: 'percy@kittehqat.com',
        password: 'sausageNum1!'
      }
    })
    const getUserByEmailQueryDouble = queryDoubleFactory({
      id: 123,
      name: 'Percy',
      email: 'percy@kittehqat.com',
      password: '$2b$10$9qRc4gXEcY697OBMvsxB4.tPfDdcWRmNj9BvoG5quV733U20GfObm'
    })

    const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)
    t.truthy(typeof login === 'function', 'returns a function')

    await login()

    const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
    t.truthy(getUserByEmailQueryWasCalled, 'query was called')

    const { calledForMethod, calledWithArg } = await apiDouble.called()
    t.is(calledForMethod, 'post', 'post method used')
    t.deepEqual(calledWithArg, {
      id: 123,
      name: 'Percy',
      message: 'Logged in',
      ok: true
    })
  },
  'responded as expected'
)

test('api::authentication::login failed because no such user found', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    app: {
      get: () => {}
    },
    body: {
      email: 'percy@kittehqat.com',
      password: 'sausageNum1!'
    }
  })
  const getUserByEmailQueryDouble = queryDoubleFactory()

  const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)

  await login()

  const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
  t.truthy(getUserByEmailQueryWasCalled, 'query was called')

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(
    nextCalledWith,
    new Error(ErrorMessage.invalidCredentials),
    'next called with invalidCredentials error'
  )
})

test('api::authentication::login failed because bad credentials submitted', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    app: {
      get: () => {}
    },
    body: {
      // missing email
      password: 'sausageNum1!'
    }
  })
  const getUserByEmailQueryDouble = queryDoubleFactory()

  const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)

  await login()

  const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
  t.falsy(getUserByEmailQueryWasCalled, 'query called')

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(
    nextCalledWith,
    new Error(ErrorMessage.invalidCredentials),
    'next called with invalidCredentials error'
  )
})

test('api::authentication::login failed because password does not match', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    app: {
      get: () => {}
    },
    body: {
      email: 'percy@kittehqat.com',
      password: 'NOT A MATCH!'
    }
  })
  const getUserByEmailQueryDouble = queryDoubleFactory()

  const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)

  await login()

  const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
  t.truthy(getUserByEmailQueryWasCalled, 'query called')

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(
    nextCalledWith,
    new Error(ErrorMessage.invalidCredentials),
    'next called with invalide credemtials arror'
  )
})

test('api::authentication::login succeeds because password matches', async (t: any) => {
  const apiDouble = apiDoubleFactory({
    app: {
      get: () => {}
    },
    body: {
      email: 'percy@kittehqat.com',
      password: 'sausageNum1!'
    }
  })
  const getUserByEmailQueryDouble = queryDoubleFactory({
    email: 'percy@kittehqat.com',
    name: 'Percy',
    password: 'sausageNum1!'
  })

  const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)

  await login()

  const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
  t.truthy(getUserByEmailQueryWasCalled, 'query called')

  const { calledForMethod, nextCalledWith } = await apiDouble.called()
  t.is(calledForMethod, 'post', 'post method used')
  t.deepEqual(
    nextCalledWith,
    new Error(ErrorMessage.invalidCredentials),
    'next called with invalid credentials errror'
  )
})
