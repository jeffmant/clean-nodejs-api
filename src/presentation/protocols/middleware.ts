import { HttpRequest, HttpResponse } from './http'

export interface Middlware {
  handle: (httpRequest: HttpRequest) => Promise <HttpResponse>
}
