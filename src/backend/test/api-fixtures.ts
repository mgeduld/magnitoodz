import { IRestApi } from '../interfaces/express'

interface IMethodConfig {
  name: string
  request: Object
  response: Function
  next: Function
}

interface IMethodActivity {
  calledWithArg: any
  calledForMethod: string
}

interface INextActivity {
  nextCalledWith: any
  calledForMethod: string
}

const getResponseFunction = (apiActtivity: IMethodActivity) => (
  caller: string
) => {
  return {
    json(value: any) {
      apiActtivity.calledWithArg = value
      apiActtivity.calledForMethod = caller
    },
    cookie() {}
  }
}

const getNextFunction = (nextActivity: INextActivity) => (caller: string) => (
  value: any
) => {
  nextActivity.nextCalledWith = value
  nextActivity.calledForMethod = caller
}

const method = ({ name, request, response, next }: IMethodConfig) => (
  route: string,
  ...args: Function[]
) => {
  args[args.length - 1](request, response(name), next(name))
}

const runSimulationApi = (
  methodActivity: IMethodActivity,
  nextActivity: INextActivity,
  resolve: Function
) => {
  const callRate = 50
  const id = setInterval(() => {
    const calledForMethod =
      methodActivity.calledForMethod || nextActivity.calledForMethod
    if (calledForMethod) {
      resolve({
        calledForMethod,
        calledWithArg: methodActivity.calledWithArg,
        nextCalledWith: nextActivity.nextCalledWith
      })
      clearInterval(id)
    }
  }, callRate)
}

interface IApiDoubleReturn {
  calledWithArg: 'string'
  calledForMethod: any
  nextCalledWith: any
}

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
  const methodActivity: IMethodActivity = {
    calledForMethod: undefined,
    calledWithArg: undefined
  }

  const nextActivity: INextActivity = {
    calledForMethod: undefined,
    nextCalledWith: undefined
  }

  const response = getResponseFunction(methodActivity)
  const next = getNextFunction(nextActivity)

  const api: IRestApi = {
    get: method({ request, response, next, name: 'get' }),
    post: method({ request, response, next, name: 'post' }),
    put: method({ request, response, next, name: 'put' }),
    delete: method({ request, response, next, name: 'delete' })
  }
  return {
    api,
    called(): Promise<IApiDoubleReturn> {
      return new Promise((resolve) => {
        runSimulationApi(methodActivity, nextActivity, resolve)
      })
    }
  }
}

interface IQueryActivity {
  called: boolean
  calledWith: any
}

const runSimulationQuery = (
  resolve: Function,
  queryActivity: IQueryActivity
) => {
  let count = 0
  const numCalls = 2
  const callRate = 50
  const id = setInterval(() => {
    if ((count = count + 1) === numCalls) {
      resolve(false)
      clearInterval(id)
    }
    if (queryActivity.called) {
      resolve(queryActivity.calledWith || true)
      clearInterval(id)
    }
  }, callRate)
}

const wasCalled = (queryActivity: IQueryActivity) => (): Promise<any> => {
  return new Promise((resolve) => {
    runSimulationQuery(resolve, queryActivity)
  })
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
  const queryActivity: IQueryActivity = {
    called: false,
    calledWith: undefined
  }
  return {
    wasCalled: wasCalled(queryActivity),
    query(...args): Promise<any> {
      queryActivity.called = true
      queryActivity.calledWith = args
      return Promise.resolve(response)
    }
  }
}
