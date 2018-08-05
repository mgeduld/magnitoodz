import test from 'ava'
import { factory } from './get-one-by-email-or-name'
import { IConnection } from '../../interfaces/connection'

test('db:user:getOneById() runs make a connection that returns a promise', async (t: any) => {
  const first = () => Promise.resolve('foo')
  const orWhere = { first }
  const where = { orWhere }
  const connection = () => ({ where })

  const getOneByEmailOrName = factory(connection)
  t.truthy(typeof getOneByEmailOrName === 'function', 'returns a function')

  const result = await getOneByEmailOrName('foo', 'bar')
  t.is(result, 'foo', 'gets expected result from query')
})
