import { IConnection } from '../../interfaces/connection'
import { IComparison } from '../../../shared/interfaces/comparison';

export const factory = (connection: IConnection) => (comparison): Promise<IComparison[]> => {
    return connection('comparison').insert(comparison, 'id').then(ids => ids[0])
}
