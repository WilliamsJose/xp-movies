import { RegisterEnum } from '../../enums'
import { IUser } from '../entities'

export interface IService {
  execute(...params: any[]): Promise<IUser | RegisterEnum | undefined>
}
