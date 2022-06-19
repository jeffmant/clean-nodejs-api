import { DbAddAccount } from '../../../data/useCases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo.repository'
import { LogMongoErrorRepository } from '../../../infra/db/mongodb/log/log-mongo.repository'
import { SignupController } from '../../../presentation/controllers/signup/signup.controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log/log-controller.decorator'
import { makeSignupValidation } from './signup-validation.factory'

export const makeSignupController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)

  const accountMongoRepository = new AccountMongoRepository()

  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signupController = new SignupController(
    dbAddAccount,
    makeSignupValidation()
  )

  const logMongoErrorRepository = new LogMongoErrorRepository()

  return new LogControllerDecorator(signupController, logMongoErrorRepository)
}
