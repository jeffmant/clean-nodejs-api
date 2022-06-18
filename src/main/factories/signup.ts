import { DbAddAccount } from '../../data/useCases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoErrorRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignupController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)

  const emailValidatorAdapter = new EmailValidatorAdapter()

  const accountMongoRepository = new AccountMongoRepository()

  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signupController = new SignupController(
    emailValidatorAdapter,
    dbAddAccount,
    makeSignupValidation()
  )

  const logMongoErrorRepository = new LogMongoErrorRepository()

  return new LogControllerDecorator(signupController, logMongoErrorRepository)
}
