import { SingupController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SingupController()
    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missim param: name'))
  })
})

describe('Signup Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new SingupController()
    const httpRequest = {
      body: {
        name: 'any name',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missim param: email'))
  })
})

describe('Signup Controller', () => {
  test('Should return 200 if name and email is provided', () => {
    const sut = new SingupController()
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'anyEmail@email.com',
        passwordConfirmation: 'anyPassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ message: 'Ok' })
  })
})
