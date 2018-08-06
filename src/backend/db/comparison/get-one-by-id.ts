import { IConnection } from '../../interfaces/connection'
import { IComparison } from '../../../shared/interfaces/comparison'

export const factory = (connection: IConnection) => (
  id: number
): Promise<IComparison[]> => {
  return connection
    .select('c.*', 'u.name AS user_name', 'u.id as user_id')
    .from('comparison AS c')
    .leftJoin('user AS u', 'u.id', 'c.user_id')
    .where('c.id', id)
    .first()
}
