import { IConnection } from '../../interfaces/connection'
import { IComparison } from '../../../shared/interfaces/comparison';

export const factory = (connection: IConnection) => (id: number): Promise<IComparison[]> => {
    return connection('user').where('id', id).first()
}