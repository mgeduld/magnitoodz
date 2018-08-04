import { IConnection } from '../../interfaces/connection'
import { ICount } from '../../interfaces/count'

export const factory = (connection: IConnection) => (): Promise<ICount> => {
  return connection('comparison').count('id')
}
