import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field.validation'
import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-field.validation'
import { Validation } from '../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeSignupValidation } from './signup-validation'
import { EmailValidator } from '../../../presentation/protocols'
import { EmailValidation } from '../../../presentation/helpers/validators/email.validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('Signup Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignupValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
