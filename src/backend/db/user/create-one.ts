import { IConnection } from '../../interfaces/connection'
import { IComparison } from '../../../shared/interfaces/comparison';

export const factory = (connection: IConnection) => (user): Promise<IComparison[]> => {
    return connection('user').insert(user, 'id').then(ids => ids[0])
}
