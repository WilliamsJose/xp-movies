import { ICacheProvider } from '../domains/providers/ICacheProvider'

export class RedisProvider implements ICacheProvider {
  constructor() {}

  async handle(query: any): Promise<any> {
    return query
  }
}
