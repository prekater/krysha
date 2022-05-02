export interface IController<Request = any, Response = any> {
  handle: (request: Request) => Promise<Response>
}
