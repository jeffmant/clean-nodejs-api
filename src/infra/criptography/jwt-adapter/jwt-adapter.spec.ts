import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise((resolve) => resolve('any_token'))
  },
  async verify (): Promise<string> {
    return await new Promise((resolve) => resolve('any_value'))
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

  describe('verify', () => {
    it('Should call verify witch correct values', async () => {
      const sut = makeSut('secret')
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    it('Should return an value on verify success', async () => {
      const sut = makeSut('secret')
      const decodedToken = await sut.decrypt('any_token')
      expect(decodedToken).toBe('any_value')
    })

    it('Should throw when verify throws', async () => {
      const sut = makeSut('secret')
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
