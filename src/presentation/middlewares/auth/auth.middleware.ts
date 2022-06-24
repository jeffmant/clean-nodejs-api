import { GetAccountByToken } from '../../../domain/useCases/getAccountByToken'
import { AccessDeniedError } from '../../errors'
import { forbidden } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middlware } from '../../protocols'

export class AuthMiddleware implements Middlware {
  constructor (
    private readonly getAccountByToken: GetAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.getAccountByToken.get(accessToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
