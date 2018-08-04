import test from 'ava'
import { factory } from './create-one'
import { IConnection } from '../../interfaces/connection'

test('db:comparison:postOne() makes a connection that returns a promise', async (t: any) => {
  let fnValue

  const connection: IConnection = () => {
    return {
      insert() {
        return {
          then(fn: Function) {
            fnValue = fn
            fn([1])
            return Promise.resolve('foo')
          }
        }
      }
    }
  }
  const createOne = factory(connection)
  t.truthy(typeof createOne === 'function', 'returns a function')

  const result = await createOne(1)
  t.is(result, 'foo', 'returns promise which resolves')

  t.truthy(typeof fnValue === 'function', 'gets called with a function')
})
