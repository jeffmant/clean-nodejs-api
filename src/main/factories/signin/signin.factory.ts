import { DbAuthentication } from '../../../data/useCases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo.repository'
import { LogMongoErrorRepository } from '../../../infra/db/mongodb/log/log-mongo.repository'
import { SigninController } from '../../../presentation/controllers/signin/signin.controller'
import { Controller } from '../../../presentation/protocols'
import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log/log-controller.decorator'
import { makeSigninValidation } from './signin-validation.factory'

export const makeSigninController = (): Controller => {
  const salt = 12

  const signinValidation = makeSigninValidation()

  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)

  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  const signinController = new SigninController(
    signinValidation,
    dbAuthentication
  )
  const logMongoErrorRepository = new LogMongoErrorRepository()

  return new LogControllerDecorator(signinController, logMongoErrorRepository)
}
