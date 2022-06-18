import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field.validation'

describe('RequiredFieldValidator', () => {
  it('Should return Missing Param error if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
