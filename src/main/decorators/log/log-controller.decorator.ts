import { LogErrorRepository } from '@src/data/protocols/db/log/log-error.repository'
import { Controller, HttpRequest, HttpResponse } from '@src/presentation/protocols'

export class LogControllerDecorator {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse | any> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
