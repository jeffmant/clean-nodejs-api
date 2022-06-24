import { GetAccountByToken } from '../../../domain/useCases/getAccountByToken'
import { AccessDeniedError } from '../../errors'
import { forbidden, ok, serverError } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middlware } from '../../protocols'

export class AuthMiddleware implements Middlware {
  constructor (
    private readonly getAccountByToken: GetAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.getAccountByToken.get(accessToken)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
