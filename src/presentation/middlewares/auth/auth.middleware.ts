import { AccessDeniedError } from '../../errors'
import { forbidden } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middlware } from '../../protocols'

export class AuthMiddleware implements Middlware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError())
    return await new Promise((resolve) => resolve(error))
  }
}
