import test from 'ava'
import { factory } from './get-one-by-id'

test('db:comparison:getOneById() makes a connection that returns a promise', async (t: any) => {
  const first = () => Promise.resolve('foo')
  const where = () => ({ first })
  const leftJoin = () => ({ where })
  const from = () => ({ leftJoin })
  const select = () => ({ from })
  const connection: any = { select }

  const getOneById = factory(connection)
  t.truthy(typeof getOneById === 'function', 'returns a function')

  const result = await getOneById(1)
  t.is(result, 'foo', 'responds as expected')
})
