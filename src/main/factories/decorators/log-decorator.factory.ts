import { LogMongoErrorRepository } from '@src/infra/db/mongodb/log/log-mongo.repository'
import { Controller } from '@src/presentation/protocols'
import { LogControllerDecorator } from '@src/main/decorators/log/log-controller.decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoErrorRepository = new LogMongoErrorRepository()

  return new LogControllerDecorator(controller, logMongoErrorRepository)
}
