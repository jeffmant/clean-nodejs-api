import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    return {
      statusCode: 200,
      body: { message: 'Ok' }
    }
  }
}
