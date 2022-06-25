import { forbidden, ok, serverError } from '@src/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@src/presentation/errors'
import { AuthMiddleware } from './auth.middleware'
import { HttpRequest } from '@src/presentation/protocols'
import { GetAccountByToken } from '@src/domain/useCases/getAccountByToken'
import { AccountModel } from '@src/domain/models/account.model'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeGetAccountByTokenStub = (): GetAccountByToken => {
  class GetAccountByTokenStub implements GetAccountByToken {
    async get (accessToken: string, role?: string): Promise<AccountModel> {
      return await new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }

  return new GetAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  getAccountByTokenStub: GetAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const getAccountByTokenStub = makeGetAccountByTokenStub()
  const sut = new AuthMiddleware(getAccountByTokenStub, role)
  return {
    sut,
    getAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should call GetAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, getAccountByTokenStub } = makeSut(role)
    const getSpy = jest.spyOn(getAccountByTokenStub, 'get')
    await sut.handle(makeFakeRequest())
    expect(getSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  it('Should return 403 if GetAccountByToken returns null', async () => {
    const { sut, getAccountByTokenStub } = makeSut()
    jest.spyOn(getAccountByTokenStub, 'get').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should return 200 if GetAccountByToken returns an found account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  it('Should return 500 if GetAccountByToken throws', async () => {
    const { sut, getAccountByTokenStub } = makeSut()
    jest.spyOn(getAccountByTokenStub, 'get').mockReturnValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
