import { HttpResponse } from '../protocols/http'

export const BadRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)
