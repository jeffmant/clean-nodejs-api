import { GetAccountByToken } from '../../../domain/useCases/getAccountByToken'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account.protocols'
import { DbGetAccountByToken } from './get-account-by-tone.usecase'
import { GetAccountByTokenRepository } from '../../protocols/db/account/get-account-by-token.repository'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeGetAccountByTokenRepository = (): GetAccountByTokenRepository => {
  class GetAccountByTokenStub implements GetAccountByTokenRepository {
    async getByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new GetAccountByTokenStub()
}

interface SutTypes {
  sut: GetAccountByToken
  decrypterStub: Decrypter
  getAccountByTokenRepository: GetAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const getAccountByTokenRepository = makeGetAccountByTokenRepository()
  const sut = new DbGetAccountByToken(decrypterStub, getAccountByTokenRepository)
  return {
    sut,
    decrypterStub,
    getAccountByTokenRepository
  }
}

describe('DbGetAccountByToken Use Case', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.get('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  it('Should DbGetAccountByToken returns null when Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.get('any_token', 'any_role')
    expect(account).toBeNull()
  })

  it('Should DbGetAccountByToken call GetAccountByTokenRepository', async () => {
    const { sut, getAccountByTokenRepository } = makeSut()
    const getByTokenSpy = jest.spyOn(getAccountByTokenRepository, 'getByToken')
    await sut.get('any_token', 'any_role')
    expect(getByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  it('Should DbGetAccountByToken return null if GetAccountByTokenRepository returns null', async () => {
    const { sut, getAccountByTokenRepository } = makeSut()
    jest.spyOn(getAccountByTokenRepository, 'getByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.get('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
