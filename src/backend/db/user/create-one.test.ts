import test from 'ava'
import { factory } from './create-one'
import { IConnection } from '../../interfaces/connection';

test('db:comparison:postOne() makes a connection that returns a promise', async (t: any) => {
    const connection: IConnection = () => {
        return {
            insert() {
                return {
                    then() {
                        return Promise.resolve('foo')
                    }
                }
            }
        }
    }
    const createOne = factory(connection)
    t.truthy(typeof createOne === 'function')

    const result = await createOne(1)
    t.is(result, 'foo')
})