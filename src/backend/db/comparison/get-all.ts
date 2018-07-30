import { IConnection } from '../../interfaces/connection'
import { IComparison } from '../../../shared/interfaces/comparison';

export const factory = (connection: IConnection) => (): Promise<IComparison[]> => {
    return connection.select(
        'c.*',
        'u.name as user_name'
    )
        .from('comparison AS c')
        .leftJoin('user AS u', 'u.id', 'c.user_id')
}