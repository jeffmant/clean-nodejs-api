import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { SigninController } from './signin'

interface SutTypes {
  sut: SigninController
}

const makeSut = (): SutTypes => {
  const sut = new SigninController()

  return {
    sut
  }
}

describe('Signin Controller', () => {
  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
