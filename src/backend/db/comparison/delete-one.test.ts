import test from 'ava'
import { factory } from './delete-one'
import { IConnection } from '../../interfaces/connection'

test('db:comparison:deleteOne() makes a connection that returns a promise', async (t: any) => {
  let fnValue
  const then = (fn: Function) => {
    fnValue = fn
    fn([1])
    return Promise.resolve('foo')
  }
  const del = () => ({ then })
  const where = () => ({ del })
  const connection: IConnection = () => ({ where })

  const deleteOne = factory(connection)
  t.truthy(typeof deleteOne === 'function', 'returns a function')

  const result = await deleteOne(1)
  t.is(result, 'foo', 'returns a promise that resolves')

  t.truthy(typeof fnValue === 'function', 'gets called with a function')
})
