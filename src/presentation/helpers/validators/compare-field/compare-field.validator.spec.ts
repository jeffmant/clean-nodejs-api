import { InvalidParamError } from '../../../errors'
import { CompareFieldsValidation } from './compare-field.validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare)

describe('Compare Fields Validator', () => {
  it('Should return Missing Param error if validation fails', () => {
    const sut = makeSut('field', 'fieldToCompare')
    const error = sut.validate({ name: 'any_value', fieldToCompare: 'another_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('Should not return error if validation passes', () => {
    const sut = makeSut('field', 'field')
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
