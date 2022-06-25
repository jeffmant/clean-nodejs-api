import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise((resolve) => resolve('any_token'))
  }
}))

const makeSut = (secret: string): JwtAdapter => {
  return new JwtAdapter(secret)
}

describe('JWT Adapter', () => {
  describe('sign', () => {
    it('Should call witch correct values', async () => {
      const sut = makeSut('secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    it('Should return a token on sign success', async () => {
      const sut = makeSut('secret')
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    it('Should throw when sign throws', async () => {
      const sut = makeSut('secret')
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
