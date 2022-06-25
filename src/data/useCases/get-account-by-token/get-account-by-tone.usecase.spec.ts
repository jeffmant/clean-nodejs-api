import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbGetAccountByToken } from './get-account-by-tone.usecase'

describe('DbGetAccountByToken Use Case', () => {
  it('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('any_value'))
      }
    }
    const decrypterStub = new DecrypterStub()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbGetAccountByToken(decrypterStub)
    await sut.get('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
