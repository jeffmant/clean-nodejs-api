import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { BadRequest } from '../helpers/http-helper'

export class SingupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return BadRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return BadRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 200,
      body: { message: 'Ok' }
    }
  }
}
