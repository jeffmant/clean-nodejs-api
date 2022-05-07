import { MissingParamError } from '../errors/missing-param-error'
import { SingupController } from './signup'

const makeSut = (): SingupController => new SingupController()

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('Signup Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any name',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

describe('Signup Controller', () => {
  test('Should return 400 if no password is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'anyEmail@email.com',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})

describe('Signup Controller', () => {
  test('Should return 400 if no password confirmation is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'anyEmail@email.com',
        password: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})

describe('Signup Controller', () => {
  test('Should return 200 if name and email is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ message: 'Ok' })
  })
})
