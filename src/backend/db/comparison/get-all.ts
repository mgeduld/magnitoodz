import { IConnection } from '../../interfaces/connection'
import { IComparison } from '../../../shared/interfaces/comparison'
import { defaultLimit, defaultOffset } from '../../constants/queries'

export const factory = (connection: IConnection) => (
  offset: number = defaultOffset,
  limit: number = defaultLimit
): Promise<IComparison[]> => {
  return connection
    .select('c.*', 'u.name as user_name')
    .from('comparison AS c')
    .orderBy('created_at', 'desc')
    .offset(offset)
    .limit(limit)
    .leftJoin('user AS u', 'u.id', 'c.user_id')
}
