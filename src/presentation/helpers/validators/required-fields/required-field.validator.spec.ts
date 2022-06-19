import { MissingParamError } from '../../../errors'
import { RequiredFieldValidation } from './required-field.validation'

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field)

describe('RequiredFieldValidator', () => {
  it('Should return Missing Param error if validation fails', () => {
    const sut = makeSut('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not return error if validation passes', () => {
    const sut = makeSut('field')
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
