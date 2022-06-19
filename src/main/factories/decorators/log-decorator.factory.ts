import { LogMongoErrorRepository } from '../../../infra/db/mongodb/log/log-mongo.repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log/log-controller.decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoErrorRepository = new LogMongoErrorRepository()

  return new LogControllerDecorator(controller, logMongoErrorRepository)
}
