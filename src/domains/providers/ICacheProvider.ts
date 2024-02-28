export interface ICacheProvider {
  handle(query: any): Promise<any>
}
