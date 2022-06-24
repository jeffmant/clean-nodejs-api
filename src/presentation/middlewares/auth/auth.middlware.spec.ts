import { forbidden, ok } from '../../helpers/http/http-helper'
import { AccessDeniedError } from '../../errors'
import { AuthMiddleware } from './auth.middleware'
import { HttpRequest } from '../../protocols'
import { GetAccountByToken } from '../../../domain/useCases/getAccountByToken'
import { AccountModel } from '../../../domain/models/account.model'

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

const makeSut = (): SutTypes => {
  const getAccountByTokenStub = makeGetAccountByTokenStub()
  const sut = new AuthMiddleware(getAccountByTokenStub)
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
    const { sut, getAccountByTokenStub } = makeSut()
    const getSpy = jest.spyOn(getAccountByTokenStub, 'get')
    await sut.handle(makeFakeRequest())
    expect(getSpy).toHaveBeenCalledWith('any_token')
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
})
