import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { BadRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'

export class SingupController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: { message: 'Ok' }
    }
  }
}
