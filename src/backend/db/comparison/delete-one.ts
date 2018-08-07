import { IConnection } from '../../interfaces/connection'
import { IComparison } from '../../../shared/interfaces/comparison'

export const factory = (connection: IConnection) => (
  id: number
): Promise<IComparison[]> => {
  return connection('comparison')
    .where('id', '=', id)
    .del()
    .then((ids) => ids[0])
}
