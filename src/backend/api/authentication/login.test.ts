import test from 'ava'
import { factory } from './login'
import { apiDoubleFactory, queryDoubleFactory } from '../../test/api-fixtures'
import { ErrorMessage } from '../../enums/error-message';

test('api::authentication::login triggers queries and then submits a response', async (t: any) => {
    const apiDouble = apiDoubleFactory({
        app: {
            get: () => { }
        },
        body: {
            email: 'percy@kittehqat.com',
            password: 'sausageNum1!'
        }
    })
    const getUserByEmailQueryDouble = queryDoubleFactory({
        id: 123,
        email: 'percy@kittehqat.com',
        password: '$2b$10$9qRc4gXEcY697OBMvsxB4.tPfDdcWRmNj9BvoG5quV733U20GfObm'
    })

    const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)
    t.truthy(typeof login === 'function')

    await login()

    const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
    t.truthy(getUserByEmailQueryWasCalled)


    const { calledForMethod, calledWithArg } = await apiDouble.called()
    t.is(calledForMethod, 'post')
    t.deepEqual(calledWithArg, { id: 123, message: 'Logged in', ok: true })
})

test('api::authentication::login failed because no such user found', async (t: any) => {
    const apiDouble = apiDoubleFactory({
        app: {
            get: () => { }
        },
        body: {
            email: 'percy@kittehqat.com',
            password: 'sausageNum1!'
        }
    })
    const getUserByEmailQueryDouble = queryDoubleFactory()

    const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)
    t.truthy(typeof login === 'function')

    await login()

    const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
    t.truthy(getUserByEmailQueryWasCalled)

    const { calledForMethod, nextCalledWith } = await apiDouble.called()
    t.is(calledForMethod, 'post')
    t.deepEqual(nextCalledWith, new Error(ErrorMessage.invalidCredentials))
})

test('api::authentication::login failed because bad credentials submitted', async (t: any) => {
    const apiDouble = apiDoubleFactory({
        app: {
            get: () => { }
        },
        body: {
            // missing email
            password: 'sausageNum1!'
        }
    })
    const getUserByEmailQueryDouble = queryDoubleFactory()

    const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)
    t.truthy(typeof login === 'function')

    await login()

    const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
    t.falsy(getUserByEmailQueryWasCalled)

    const { calledForMethod, nextCalledWith } = await apiDouble.called()
    t.is(calledForMethod, 'post')
    t.deepEqual(nextCalledWith, new Error(ErrorMessage.invalidCredentials))
})

test('api::authentication::login failed because password does not match', async (t: any) => {
    const apiDouble = apiDoubleFactory({
        app: {
            get: () => { }
        },
        body: {
            email: 'percy@kittehqat.com',
            password: 'NOT A MATCH!'
        }
    })
    const getUserByEmailQueryDouble = queryDoubleFactory()

    const login = factory(apiDouble.api, getUserByEmailQueryDouble.query)
    t.truthy(typeof login === 'function')

    await login()

    const getUserByEmailQueryWasCalled = await getUserByEmailQueryDouble.wasCalled()
    t.truthy(getUserByEmailQueryWasCalled)

    const { calledForMethod, nextCalledWith } = await apiDouble.called()
    t.is(calledForMethod, 'post')
    t.deepEqual(nextCalledWith, new Error(ErrorMessage.invalidCredentials))
})