export interface IUseCase {
  execute(...params: any): Promise<any | undefined>
}
