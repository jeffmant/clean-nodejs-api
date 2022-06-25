import { SigninController } from '@src/presentation/controllers/signin/signin.controller'
import { Controller } from '@src/presentation/protocols'
import { makeLogControllerDecorator } from '@src/main/factories/decorators/log-decorator.factory'
import { makeDbAuthentication } from '@src/main/factories/usecases/auth/db-auth-usecase.factory'
import { makeSigninValidation } from './signin-validation.factory'

export const makeSigninController = (): Controller => {
  const signinController = new SigninController(makeSigninValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signinController)
}
