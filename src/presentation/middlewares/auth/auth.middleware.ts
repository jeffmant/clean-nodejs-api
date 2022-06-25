import { GetAccountByToken, HttpRequest, HttpResponse, Middlware } from './auth.middleware.protocols'
import { AccessDeniedError } from '../../errors'
import { forbidden, ok, serverError } from '../../helpers/http/http-helper'

export class AuthMiddleware implements Middlware {
  constructor (
    private readonly getAccountByToken: GetAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.getAccountByToken.get(accessToken, this.role)
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
