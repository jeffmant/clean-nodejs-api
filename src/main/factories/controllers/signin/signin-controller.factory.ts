import { SigninController } from '../../../../presentation/controllers/signin/signin.controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-decorator.factory'
import { makeDbAuthentication } from '../../usecases/auth/db-auth-usecase.factory'
import { makeSigninValidation } from './signin-validation.factory'

export const makeSigninController = (): Controller => {
  const signinController = new SigninController(makeSigninValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signinController)
}
