import test from 'ava'
import { factory } from './get-one-by-email'
import { IConnection } from '../../interfaces/connection'

test('db:user:getOneByEmail() makes a connection that returns a promise', async (t: any) => {
  const first = () => Promise.resolve('foo')
  const where = () => ({ first })
  const connection: IConnection = () => ({ where })

  const getOneByEmail = factory(connection)
  t.truthy(typeof getOneByEmail === 'function', 'returns a function')

  const result = await getOneByEmail('foo')
  t.is(result, 'foo', 'gets expected value from query')
})
