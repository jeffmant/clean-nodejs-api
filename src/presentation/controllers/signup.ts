import { HttpRequest, HttpResponse } from '../protocols/http'

export class SingupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missim param: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missim param: email')
      }
    }

    return {
      statusCode: 200,
      body: { message: 'Ok' }
    }
  }
}
