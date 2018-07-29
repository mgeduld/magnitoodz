import { IRestApi } from '../interfaces/express'

/**
 * Used for testing rest API methods (get, post...), doubling the ones used by express
 * 
 * Usage:
 * 
 * const apiDouble = apiDoubleFactory()
 * 
 * // in test: getAll adds an express route which eventually calles route.get(...)
 * // or some simular method
 * const const getAll = getAllFactory(apiDouble.api, queryDouble.query) 
 * await getAll()
 * const { calledForMethod, calledWithArg } = await apiDouble.called()
 * t.is(calledForMethod, 'get')
 * t.deepEqual(calledWithArg, { ok: true, data: 'foo' })
 * 
 * @param request optional request object
 */
export const apiDoubleFactory = (request: object = {}) => {
    let calledWithArg
    let calledForMethod
    let nextCalledWith
    const response = (caller: string) => {
        return {
            json(value: any) {
                calledWithArg = value
                calledForMethod = caller
            },
            cookie() { }
        }
    }
    const next = (caller: string) => (value: any) => {
        nextCalledWith = value
        calledForMethod = caller
    }
    const api: IRestApi = {
        get(route: string, ...args: Function[]) { args[args.length - 1](request, response('get'), next('get')) },
        post(route: string, ...args: Function[]) { args[args.length - 1](request, response('post'), next('post')) },
        put(route: string, ...args: Function[]) { args[args.length - 1](request, response('put'), next('put')) },
        delete(route: string, ...args: Function[]) { args[args.length - 1](request, response('delete'), next('delete')) }
    }
    return {
        api,
        called(): Promise<{ calledWithArg: 'string', calledForMethod: any, nextCalledWith: any }> {
            return new Promise(resolve => {
                const id = setInterval(() => {
                    if (calledForMethod) {
                        resolve({ calledWithArg, calledForMethod, nextCalledWith })
                        clearInterval(id)
                    }
                }, 50)
            })
        }
    }
}


/**
 * Used for doubling knex queries in tests
 * 
 * Usage: 
 * 
 * const queryDouble = queryDoubleFactory('foo')
 * // in test: getAll adds an express route which eventually calles route.get(...)
 * // or some simular method
 * const getAll = factory(apiDouble.api, queryDouble.query)
 * await getAll()
 * t.is(queryDouble.wasCalled(), true)
 * t.is(queryDouble.timesCalled(), 1)
 * 
 * @param response response that comes back from the query
 */
export const queryDoubleFactory = (response?: any) => {
    let called = false
    return {
        wasCalled(): Promise<any> {
            return new Promise(resolve => {
                let count = 0
                const id = setInterval(() => {
                    if (count++ === 20) {
                        resolve(false)
                        clearInterval(id)
                    }
                    if (called) {
                        resolve(true)
                        clearInterval(id)
                    }
                }, 50)
            })
        },
        query(): Promise<any> {
            called = true
            return Promise.resolve(response)
        }
    }
}