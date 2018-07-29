import test from 'ava'
import { factory } from './post-one'
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
    const postOne = factory(connection)
    t.truthy(typeof postOne === 'function')

    const result = await postOne(1)
    t.is(result, 'foo')
})