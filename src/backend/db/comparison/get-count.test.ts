import test from 'ava'
import { factory } from './get-count'
import { IConnection } from '../../interfaces/connection'
import { ICount } from '../../interfaces/count'

test('db::comparison::getCount', async (t: any) => {
  const connection: IConnection = () => ({
    count: (): Promise<ICount[]> => Promise.resolve([{ count: '5' }])
  })

  const result = await factory(connection)()

  t.deepEqual(result, [{ count: '5' }])
})
