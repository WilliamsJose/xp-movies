export interface IController {
  handle(request: any): Promise<any>
}
