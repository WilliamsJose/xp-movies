import { IUseCaseResult } from './IUseCaseResult'

export interface IUseCase {
  execute(...params: any): Promise<any | IUseCaseResult | undefined>
}
