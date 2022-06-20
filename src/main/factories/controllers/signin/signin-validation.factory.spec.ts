import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../validation/validators'
import { Validation, EmailValidator } from '../../../../presentation/protocols'
import { makeSigninValidation } from './signin-validation.factory'

jest.mock('../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Signin Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSigninValidation()

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
