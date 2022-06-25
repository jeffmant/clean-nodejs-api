import { GetAccountByToken } from '../../../domain/useCases/getAccountByToken'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbGetAccountByToken } from './get-account-by-tone.usecase'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

interface SutTypes {
  sut: GetAccountByToken
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbGetAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DbGetAccountByToken Use Case', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.get('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
