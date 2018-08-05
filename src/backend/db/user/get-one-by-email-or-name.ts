import { IConnection } from '../../interfaces/connection'
import { IComparison } from '../../../shared/interfaces/comparison'

export const factory = (connection: IConnection) => (
  email: string,
  name: string
): Promise<IComparison[]> => {
  return connection('user')
    .where('email', email)
    .orWhere('name', name)
    .first()
}
