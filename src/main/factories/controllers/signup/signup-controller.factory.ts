import { SignupController } from '../../../../presentation/controllers/signup/signup.controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-decorator.factory'
import { makeDbAddAccount } from '../../usecases/add-account/add-account-usecase.factory'
import { makeDbAuthentication } from '../../usecases/auth/db-auth-usecase.factory'
import { makeSignupValidation } from './signup-validation.factory'

export const makeSignupController = (): Controller => {
  const signupController = new SignupController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(signupController)
}
