import { SignupController } from '@src/presentation/controllers/signup/signup.controller'
import { Controller } from '@src/presentation/protocols'
import { makeLogControllerDecorator } from '@src/main/factories/decorators/log-decorator.factory'
import { makeDbAddAccount } from '@src/main/factories/usecases/add-account/add-account-usecase.factory'
import { makeDbAuthentication } from '@src/main/factories/usecases/auth/db-auth-usecase.factory'
import { makeSignupValidation } from './signup-validation.factory'

export const makeSignupController = (): Controller => {
  const signupController = new SignupController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(signupController)
}
