import test from 'ava'
import { factory } from './update-one'
import { IConnection } from '../../interfaces/connection'

test('db:comparison:updateOne() makes a connection that returns a promise', async (t: any) => {
  let fnValue
  const then = (fn: Function) => {
    fnValue = fn
    fn([1])
    return Promise.resolve('foo')
  }
  const update = () => ({ then })
  const where = () => ({ update })
  const connection: IConnection = () => ({ where })

  const updateOne = factory(connection)
  t.truthy(typeof updateOne === 'function', 'returns a function')

  const result = await updateOne(1)
  t.is(result, 'foo', 'returns a promise that resolves')

  t.truthy(typeof fnValue === 'function', 'gets called with a function')
})
