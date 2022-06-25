import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@src/validation/validators'
import { Validation } from '@src/presentation/protocols'
import { EmailValidatorAdapter } from '@src/infra/validators/email/email-validator-adapter'

export const makeSigninValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
