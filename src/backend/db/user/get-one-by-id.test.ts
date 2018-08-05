import test from 'ava'
import { factory } from './get-one-by-id'
import { IConnection } from '../../interfaces/connection'

test('db:user:getOneById() makes a connection that returns a promise', async (t: any) => {
  const first = () => Promise.resolve('foo')
  const where = () => ({ first })
  const connection: IConnection = () => ({ where })

  const getOneById = factory(connection)
  t.truthy(typeof getOneById === 'function', 'returns a function')

  const result = await getOneById(1)
  t.is(result, 'foo', 'gets expected result from query')
})
