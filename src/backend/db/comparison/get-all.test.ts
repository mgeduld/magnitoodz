import test from 'ava'
import { factory } from './get-all'
import { IConnection } from '../../interfaces/connection';

test('db:comparison:getAll()', async (t: any) => {
    const connection: IConnection = () => {
        return Promise.resolve('foo')
    }
    const getAll = factory(connection)
    t.truthy(typeof getAll === 'function')

    const result = await getAll()
    t.is(result, 'foo')
})